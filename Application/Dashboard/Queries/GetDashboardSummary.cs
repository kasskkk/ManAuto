using System;
using Application.Core;
using Application.Dashboard.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dashboard.Queries;

public class GetDashboardSummary
{
    public class Query : IRequest<Result<GetDashboardSummaryDto>> { }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<GetDashboardSummaryDto>>
    {
        public async Task<Result<GetDashboardSummaryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var now = DateTime.UtcNow;
            var firstDayOfMonth = new DateTime(now.Year, now.Month, 1);

            var totalVehiclesRented = await context.Rentals.CountAsync(x => x.RentalStatus != RentalStatus.Cancelled, cancellationToken);

            var activeRentals = await context.Rentals.CountAsync(x =>
                x.RentalStatus != RentalStatus.Cancelled
                && x.RentalStatus != RentalStatus.Returned, cancellationToken);

            var monthlyRevenue = await context.Rentals
                .Where(r => r.CreatedAt >= firstDayOfMonth && r.RentalStatus != RentalStatus.Cancelled)
                .SumAsync(r => r.TotalPrice, cancellationToken);

            var thirtyDaysAgo = DateTime.UtcNow.Date.AddDays(-29);

            var dailyStats = await context.Rentals
                .Where(r => r.CreatedAt >= thirtyDaysAgo && r.RentalStatus != RentalStatus.Cancelled)
                .GroupBy(r => r.CreatedAt.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    Count = g.Count()
                })
                .ToListAsync(cancellationToken);

            var rentalTrends = Enumerable.Range(0, 30)
                .Select(offset =>
                {
                    var date = thirtyDaysAgo.AddDays(offset);
                    var stats = dailyStats.FirstOrDefault(s => s.Date == date);
                    return new DashboardRentalTrendsDto
                    {
                        Date = date.ToString("dd.MM"),
                        RentalCount = stats?.Count ?? 0
                    };
                }).ToList();

            var recentRentals = await context.Rentals
                .OrderByDescending(r => r.CreatedAt)
                .Take(6)
                .ProjectTo<DashboardRecentRentsDto>(mapper.ConfigurationProvider) 
                .ToListAsync(cancellationToken);

            var dashboardSummary = new GetDashboardSummaryDto
            {
                TotalVehiclesRented = totalVehiclesRented,
                ActiveRentals = activeRentals,
                MonthlyRevenue = monthlyRevenue,
                RentalTrends = rentalTrends,
                Rentals = recentRentals
            };

            return Result<GetDashboardSummaryDto>.Success(dashboardSummary);
        }
    }
}
