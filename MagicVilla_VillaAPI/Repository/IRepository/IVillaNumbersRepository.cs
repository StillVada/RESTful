using MagicVilla_VillaAPI.Models;

namespace MagicVilla_VillaAPI.Repository.IRepository
{
    public interface IVillaNumbersRepository : IUniversalRepository<VillaNumber>
    {
        Task<VillaNumber> UpdateAsync(VillaNumber entity);

    }
}
