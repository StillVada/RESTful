using MagicVilla_VillaAPI.Data;
using MagicVilla_VillaAPI.Models;

namespace MagicVilla_VillaAPI.Repository.IRepository
{
    public interface IUserRepository : IUniversalRepository<User>
    {
        Task<User> UpdateAsync(User entity);
    }
}
