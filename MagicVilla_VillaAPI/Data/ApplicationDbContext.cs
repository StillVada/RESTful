using MagicVilla_VillaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MagicVilla_VillaAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Villa> Villas { get; set; }
        public DbSet<VillaNumber> VillaNumbers { get; set; }
     
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Villa>().HasData(
                new Villa()
                {
                    Id = 1,
                    Name = "name",
                    Details = "goy",
                    ImageUrl = "",
                    Occupancy =5, 
                    Rate = 200,
                    Sqft = 550, 
                    Amenity = "",
                    CreatedDate = new DateTime(2023, 1, 1)
                },
                new Villa()
                {
                    Id = 2,
                    Name = "name",
                    Details = "goy",
                    ImageUrl = "",
                    Occupancy = 5,
                    Rate = 200,
                    Sqft = 550,
                    Amenity = "",
                    CreatedDate = new DateTime(2023, 1, 1)
                }
                );
            modelBuilder.Entity<VillaNumber>().HasData(
                new VillaNumber()
                {
                    VillaNo = 1,
                    VillaID =1,
                    SpecialDetails = "name",
                    CreatedDate = new DateTime(2023, 1, 1),
                    UpdatedDate = new DateTime(2023, 1, 1)

                },
                new VillaNumber()
                {
                    VillaNo = 2,
                    VillaID=2,
                    SpecialDetails = "name",
                    CreatedDate = new DateTime(2023, 1, 1),
                    UpdatedDate = new DateTime(2023, 1, 1)
                }
            );

        }
    }
}
