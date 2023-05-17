import { Component, OnInit } from '@angular/core';
import { ModalViewComponent } from 'app/modal-view/modal-view.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'app/models/task';
import { ToDoListService } from 'app/services/to-do-list.service';
import { ToDoList } from 'app/models/to-do-list';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  toDoLists: ToDoList[];
  toDoList: ToDoList;


constructor(private toDoListService: ToDoListService, private modalView: MatDialog) { }
deleteTodoList(id:number){

}
editTodoList(id:number){
  
}
viewTodoList(id:number){
  this.toDoListService.getToDoList(id).subscribe(
    (res) => {
      this.toDoList = res;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.toDoList;
      this.modalView.open(ModalViewComponent, dialogConfig);
    }
  );
}
ngOnInit() {
  this.toDoListService.getToDoLists("362a9yi8bAZEG3gVoRIa91dVerS2").subscribe(
    (res) => {
      console.log(res);
      this.toDoLists = res;
    },);
}
}

