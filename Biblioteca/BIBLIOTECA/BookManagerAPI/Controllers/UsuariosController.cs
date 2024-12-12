using BookManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;









namespace BookManagerAPI.Controllers
{









    [ApiController]
    [Route("api/[controller]")]

    public class UsuarioController : ControllerBase
    {

        private static List<Usuario> usuarios = new() 

        {
            new () { Id = 1, Nome = "Juninho Junior", Telefone = 41997411911, Idade = 25},
            new () { Id = 2, Nome = "Juninho Carlos", Telefone = 4198452633, Idade = 20},
            new () { Id = 3, Nome = "Juninho Alberto", Telefone = 4187785256, Idade = 19},
            new () { Id = 4, Nome = "Juninho Alves", Telefone = 41997411911, Idade = 25},
            new () { Id = 5, Nome = "Juninho Silva", Telefone = 4198452633, Idade = 20},
            new () { Id = 6, Nome = "Juninho Santos", Telefone = 4187785256, Idade = 19},
        };
            















        [HttpGet]
        public ActionResult<List<Usuario>> VerUsuarios()
        {
            return Ok(usuarios);
        }



















        [HttpPost]
        public ActionResult AdicionarUsuario(Usuario novoUsuario)
        {
            if (string.IsNullOrEmpty(novoUsuario.Nome) ||
                novoUsuario.Telefone <= 0 ||
                novoUsuario.Idade <= 0)

            {
                return BadRequest("Dados inválidos. Por favor, preencha todos os campos corretamente.");
            }

            novoUsuario.Id = usuarios.Count > 0 ? usuarios[usuarios.Count - 1].Id + 1 : 1;
            usuarios.Add(novoUsuario);

            return Ok(novoUsuario);
        }



















        [HttpDelete("{id}")]
        public ActionResult DeletarUsuario(int id)
        {
            var usuario = usuarios.FirstOrDefault(usuario => usuario.Id == id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            usuarios.Remove(usuario);
            return NoContent();
        }













    }
}
