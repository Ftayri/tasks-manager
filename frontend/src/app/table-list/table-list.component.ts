import { Component, OnInit } from '@angular/core';
import { Task } from 'app/models/task';
import { ToDoListService } from 'app/services/to-do-list.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  todolists: {
    title: string,
    description: string,
    dueDate: Date,
    tasks: Task[],
    createdAt: Date,
  };


constructor(private todolistser: ToDoListService) { }

ngOnInit() {
  this.todolistser.getToDoLists("362a9yi8bAZEG3gVoRIa91dVerS2").subscribe(
    (res) => {
      console.log(res);
      this.todolists = res;
    },);


}
}

