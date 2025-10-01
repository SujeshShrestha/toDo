import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/todo-item.model';
import { TodoListComponent } from '../todo-list/todo-list';
import { AddTodoComponent } from '../add-todo/add-todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, TodoListComponent, AddTodoComponent],
  template: `
    <div class="todo-app">
      <app-add-todo (todoAdded)="onTodoAdded($event)"></app-add-todo>
      <app-todo-list 
        [todos]="todos" 
        [loading]="loading" 
        [error]="error"
        (delete)="onDeleteTodo($event)"
        (toggleComplete)="onToggleComplete($event)">
      </app-todo-list>
    </div>
  `,
  styles: [`
    .todo-app {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  loading = false;
  error = '';

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = '';
    
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load todos. Please try again.';
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Error:', err);
      }
    });
  }

  onTodoAdded(newTodo: TodoItem): void {
    this.todos.push(newTodo);
  }

  onDeleteTodo(id: number): void {
    // Store the original todos in case we need to restore
    const originalTodos = [...this.todos];
    
    // Optimistic delete - remove from UI immediately
    this.todos = this.todos.filter(todo => todo.id !== id);
    
    // Call API in background
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        // Success - item is already removed from UI
      },
      error: (err) => {
        // Error - restore the original todos
        this.todos = originalTodos;
        this.error = 'Failed to delete todo. Please try again.';
        console.error('Delete error:', err);
      }
    });
  }

  onToggleComplete(todo: TodoItem): void {
    // Store original state
    const originalTodo = { ...todo };
    
    // Optimistic update - update UI immediately
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = { ...todo, isCompleted: !todo.isCompleted };
    }
    
    // Call API in background
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe({
      next: (result) => {
        // Success - UI is already updated
      },
      error: (err) => {
        // Error - restore original state
        if (index !== -1) {
          this.todos[index] = originalTodo;
        }
        this.error = 'Failed to update todo. Please try again.';
        console.error('Error:', err);
      }
    });
  }
}
