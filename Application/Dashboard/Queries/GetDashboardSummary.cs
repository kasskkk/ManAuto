using System;
using Application.Core;
using Application.Dashboard.DTOs;
using AutoMapper;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dashboard.Queries;

public class GetDashboardSummary
{
    public class Query : IRequest<Result<GetDashboardSummaryDto>> { }

    public class Handler(AppDbContext context) : IRequestHandler<Query, Result<GetDashboardSummaryDto>>
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

            var dashboardSummary = new GetDashboardSummaryDto
            {
                TotalVehiclesRented = totalVehiclesRented,
                ActiveRentals = activeRentals,
                MonthlyRevenue = monthlyRevenue
            };

            return Result<GetDashboardSummaryDto>.Success(dashboardSummary);
        }
    }
}
