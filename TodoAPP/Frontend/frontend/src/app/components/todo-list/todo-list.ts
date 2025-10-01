import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.css']
})
export class TodoListComponent {
  @Input() todos: TodoItem[] = [];
  @Input() loading = false;
  @Input() error = '';
  
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<TodoItem>();


  onDeleteTodo(id: number): void {
    this.delete.emit(id);
  }

  onToggleComplete(todo: TodoItem): void {
    this.toggleComplete.emit(todo);
  }
}