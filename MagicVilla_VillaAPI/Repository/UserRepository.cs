using MagicVilla_VillaAPI.Data;
using MagicVilla_VillaAPI.Models;
using MagicVilla_VillaAPI.Repository.IRepository;

namespace MagicVilla_VillaAPI.Repository
{
    namespace MagicVilla_VillaAPI.Repository
    {
        public class UserRepository : Repository<User>, IUserRepository
        {
            private readonly ApplicationDbContext _db;

            public UserRepository(ApplicationDbContext db) : base(db)
            {
                _db = db;
            }
            public async Task<User> UpdateAsync(User entity)
            {
                _db.Users.Update(entity);
                await _db.SaveChangesAsync();
                return entity;
            }
        }
    }
}
