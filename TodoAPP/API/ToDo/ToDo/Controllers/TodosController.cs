using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.Models;
using ToDo.Services;

namespace ToDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoItem>>> GetTodos()
        {
            var todos = await _todoService.GetAllTodosAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodo(int id)
        {
            var todo = await _todoService.GetTodoByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Title))
            {
                return BadRequest("Title is required");
            }

            var createdTodo = await _todoService.CreateTodoAsync(todo);
            return CreatedAtAction(nameof(GetTodo), new { id = createdTodo.Id }, createdTodo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItem>> UpdateTodo(int id, TodoItem todo)
        {
            if (id != todo.Id)
            {
                return BadRequest("ID mismatch");
            }

            var updatedTodo = await _todoService.UpdateTodoAsync(id, todo);
            if (updatedTodo == null)
            {
                return NotFound();
            }

            return Ok(updatedTodo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTodo(int id)
        {
            var result = await _todoService.DeleteTodoAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

