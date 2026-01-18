using Bogus;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Seeds;

public class DbInitializer
{
    public async static Task SeedAsync(AppDbContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<User>
            {
                new() {UserName = "bob@test.com",Email = "bob@test.com"},
                new() {UserName = "tom@test.com",Email = "tom@test.com"},
                new() {UserName = "jane@test.com",Email = "jane@test.com"},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
        ;

        if (!context.Vehicles.Any())
        {
            var vehicleTypes = new[] { VehicleType.PassengerCar, VehicleType.Camper, VehicleType.Minibus };

            var vehicleFaker = new Faker<Vehicle>("pl")
                .RuleFor(v => v.Brand, f => f.Vehicle.Manufacturer())
                .RuleFor(v => v.Model, f => f.Vehicle.Model())
                .RuleFor(v => v.LicensePlate, f => f.Random.Replace("?? #####"))
                .RuleFor(v => v.ProductionYear, f => f.Random.Number(2015, 2024))
                .RuleFor(v => v.VehicleType, f => f.PickRandom(vehicleTypes));

            var vehicles = vehicleFaker.Generate(25);

            context.Vehicles.AddRange(vehicles);
            await context.SaveChangesAsync();
        }
    }
}
