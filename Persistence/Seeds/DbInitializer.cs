using Bogus;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Seeds;

public class DbInitializer
{
    public async static Task SeedAsync(AppDbContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<User>
            {
                new() {UserName = "bob@test.com",Email = "bob@test.com", PhoneNumber="999999999"},
                new() {UserName = "tom@test.com",Email = "tom@test.com", PhoneNumber="888888888"},
                new() {UserName = "jane@test.com",Email = "jane@test.com", PhoneNumber="777777777"},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }


        if (!context.Vehicles.Any())
        {
            var types = Enum.GetValues<VehicleType>();

            var vehicleFaker = new Faker<Vehicle>("pl")
                .RuleFor(v => v.Brand, f => f.Vehicle.Manufacturer())
                .RuleFor(v => v.Model, f => f.Vehicle.Model())
                .RuleFor(v => v.LicensePlate, f => f.Random.Replace("?? #####"))
                .RuleFor(v => v.ProductionYear, f => f.Random.Number(2015, 2024))
                .RuleFor(v => v.VehicleType, f => f.PickRandom(types))
                .RuleFor(v => v.PricePerDay, f => Math.Round(f.Random.Decimal(100, 1000), 2));

            var vehicles = vehicleFaker.Generate(25);

            context.Vehicles.AddRange(vehicles);
            await context.SaveChangesAsync();
        }

        if (!context.Rentals.Any())
        {
            var users = await userManager.Users.ToListAsync();
            var vehicles = await context.Vehicles.ToListAsync();
            var statuses = Enum.GetValues<RentalStatus>();

            var rentalFaker = new Faker<Rental>("pl")
                .RuleFor(r => r.UserId, f => f.PickRandom(users).Id)
                .RuleFor(r => r.VehicleId, f => f.PickRandom(vehicles).Id)
                .RuleFor(r => r.StartDate, f => f.Date.Soon(10))
                .RuleFor(r => r.EndDate, (f, r) => r.StartDate.AddDays(f.Random.Number(1, 14)))
                .RuleFor(r => r.RentalStatus, f => f.PickRandom(statuses))
                .FinishWith((f, r) =>
                {
                    var vehicle = vehicles.FirstOrDefault(v => v.Id == r.VehicleId);
                    var days = (r.EndDate - r.StartDate).Days;
                    if (days <= 0) days = 1;
                    r.TotalPrice = (vehicle?.PricePerDay ?? 100) * days;
                });

            var rentals = rentalFaker.Generate(25);
            context.Rentals.AddRange(rentals);
            await context.SaveChangesAsync();
        }
    }
}
