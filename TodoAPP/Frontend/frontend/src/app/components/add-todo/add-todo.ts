import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../../models/todo-item.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css'
})
export class AddTodoComponent {
  @Output() todoAdded = new EventEmitter<TodoItem>();

  loading = false;
  error = '';

  newTodo = {
    title: '',
    description: '',
    isCompleted: false
  };

  constructor(private todoService: TodoService) {}

  onSubmit(): void {
    if (this.newTodo.title.trim()) {
      this.loading = true;
      this.error = '';

      // Simple API call - easy to explain in interview
      this.todoService.createTodo(this.newTodo as TodoItem).subscribe({
        next: (newTodo) => {
          this.todoAdded.emit(newTodo);
          this.resetForm();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to add todo. Please try again.';
          this.loading = false;
          console.error('Error:', err);
        }
      });
    }
  }

  private resetForm(): void {
    this.newTodo = {
      title: '',
      description: '',
      isCompleted: false
    };
  }
}
