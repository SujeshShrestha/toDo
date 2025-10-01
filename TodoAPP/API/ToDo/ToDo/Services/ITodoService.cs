using ToDo.Models;

namespace ToDo.Services
{
    public interface ITodoService
    {
        Task<List<TodoItem>> GetAllTodosAsync();
        Task<TodoItem?> GetTodoByIdAsync(int id);
        Task<TodoItem> CreateTodoAsync(TodoItem todo);
        Task<TodoItem?> UpdateTodoAsync(int id, TodoItem todo);
        Task<bool> DeleteTodoAsync(int id);
    }
}
