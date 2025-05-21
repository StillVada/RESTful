using MagicVilla_VillaAPI.Services.IServices;
using System.Security.Cryptography;
using System.Text;

namespace MagicVilla_VillaAPI.Services
{
    public class Hashing : IHashing
    {
        public string ComputeHashSha128(string str)
        {
            using (var sha128 = SHA1.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(str);
                byte[] hash = sha128.ComputeHash(passwordBytes);
                return Convert.ToBase64String(hash);
            }
        }
    }
}
