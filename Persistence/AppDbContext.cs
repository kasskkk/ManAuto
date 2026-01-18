using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Rental>()
            .HasOne(x => x.User)
            .WithMany(x => x.Rentals)
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Rental>()
            .HasOne(x => x.Vehicle)
            .WithMany(x => x.Rentals)
            .HasForeignKey(x => x.VehicleId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Rental>()
                .Property(x => x.TotalPrice)
                .HasPrecision(18, 2);
        }
    }
}
