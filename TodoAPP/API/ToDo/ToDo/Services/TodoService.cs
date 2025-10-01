using System.Reflection.Metadata.Ecma335;
using ToDo.Models;

namespace ToDo.Services
{
    public class TodoService : ITodoService
    {
        private static readonly List<TodoItem> _todos = new();

        private static int _nextId = 1;
        public Task<TodoItem> CreateTodoAsync(TodoItem todo)
        {
            ///tester data
            todo.Id = _nextId++;
            todo.CreatedDate = DateTime.UtcNow;
            _todos.Add(todo);
            return Task.FromResult(todo);
        }

        public Task<bool> DeleteTodoAsync(int id)
        {
            var deleteTodo = _todos.FirstOrDefault(x => x.Id == id);
            if (deleteTodo != null)
            {
                _todos.Remove(deleteTodo);
                return Task.FromResult(true);
            }
            return Task.FromResult(false);
        }

        public Task<List<TodoItem>> GetAllTodosAsync()
        {
            return Task.FromResult(_todos);
        }

        public Task<TodoItem?> GetTodoByIdAsync(int id)
        {
            var todo = _todos.FirstOrDefault(t => t.Id == id);
            return Task.FromResult(todo);
        }

        public Task<TodoItem?> UpdateTodoAsync(int id, TodoItem updatedTodo)
        {
            var existingTodo = _todos.FirstOrDefault(t => t.Id == id);
            if (existingTodo != null)
            {
                existingTodo.Title = updatedTodo.Title;
                existingTodo.Description = updatedTodo.Description;
                existingTodo.IsCompleted = updatedTodo.IsCompleted;
            }
            return Task.FromResult(existingTodo);
        }
    }
}
