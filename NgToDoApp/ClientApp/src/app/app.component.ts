import { Component, OnInit, Input, Inject } from '@angular/core';
import { TaskListService } from "./task-list.service";
import { Task } from "./task";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @Input() newTask: string;

  testTask: Task = {
    description: "testtask",
    completed: false,
    dateCreated: "01/01/1888"
  };

  public tasklist: Task[]; // master tasklist used by everything

  private newTaskInput: string; // track whats in the Add Task Field

  constructor(private ListSVC: TaskListService) {
    // Get Todo List from server
    ListSVC.getTaskList().subscribe((data: Task[]) => this.tasklist = data);
  }

  ngOnInit() {
  }

  addTask(desc: string) {
    if (desc && desc.trim() != "") {
      var date = new Date();
      var today: string = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
      this.ListSVC.addTask({ description: desc, completed: false, dateCreated: today }).subscribe(task => this.tasklist.push(task));
      this.newTaskInput = "";
    }
  }

  deleteTask(index: number) {
    this.ListSVC.deleteTask(index).subscribe((index: number) => this.tasklist.splice(index, 1));
  }

  editTask(index: number, updatedTask: Task) {
    this.ListSVC.editTask(index, updatedTask).subscribe(task => this.tasklist[index] = task);
  }

  update() {
    this.ListSVC.getTaskList().subscribe((data: Task[]) => this.tasklist = data);
  }

  private testFunc() {
    console.log("BEGIN TEST");
    this.ListSVC.addTask(this.testTask).subscribe(task => this.tasklist.push(task));
    console.log("END TEST");
  }
}
