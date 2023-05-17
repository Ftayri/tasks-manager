import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDeleteComponent } from 'app/modal-delete/modal-delete.component';
import { ModalViewComponent } from 'app/modal-view/modal-view.component';
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

  constructor(private toDoListService: ToDoListService, private modalView: MatDialog, private dialog: MatDialog) { }
  deleteTodoList(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ModalDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((x) => {
      if (x) {
        this.toDoListService.Delete(id).subscribe(res => {
          this.toDoListService.getToDoLists("362a9yi8bAZEG3gVoRIa91dVerS2");
          console.log('Deleted');
          this.ngOnInit();
        });
      }
    });
  }
  editTodoList(id: number) {

  }
  viewTodoList(id: string) {
    this.toDoListService.getToDoList(id).subscribe(
      (res) => {
        this.toDoList = res;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.toDoList;
        this.modalView.open(ModalViewComponent, dialogConfig).afterClosed().subscribe(
          (res: ToDoList) => {
            this.toDoList = res;
            this.ngOnInit();
          }
        );
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

