import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;
  // vars to track editing
  public editing: boolean = false;
  public editButtonState: string = "Edit";
  public edits: string;

  constructor(private todoList: AppComponent) {
  }

  ngOnInit() {
  }

  public toggleEdits() {
    if (this.editing) {
      this.editing = false;
      this.editButtonState = "Edit";

      if (this.edits != this.task.description) { // prevent http req if nothing changed
        this.editItem();
      }
    }
    else {
      this.edits = this.task.description;
      this.editing = true;
      this.editButtonState = "Save";
    }
    
  }

  public editItem() {
    if (this.edits && this.edits.trim() != "") {
      var editedTask = Object.assign({}, this.task);
      editedTask.description = this.edits;
      this.todoList.editTask(this.index, editedTask);
    }
  }

  public deleteItem() {
    this.todoList.deleteTask(this.index);
  }

  public toggleCompleted(i: number) {
    var toggledTask = Object.assign({}, this.task);
    toggledTask.completed = !this.task.completed;
    this.todoList.editTask(i, toggledTask);
  }
}
