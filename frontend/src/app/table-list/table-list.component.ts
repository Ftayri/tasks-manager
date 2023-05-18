import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDeleteComponent } from 'app/modal-delete/modal-delete.component';
import { ModalViewComponent } from 'app/modal-view/modal-view.component';
import { ToDoListService } from 'app/services/to-do-list.service';
import { ToDoList } from 'app/models/to-do-list';
import { ModalEditComponent } from 'app/modal-edit/modal-edit.component';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  toDoLists: ToDoList[];
  toDoList: ToDoList;

  constructor(private toDoListService: ToDoListService, private modalView: MatDialog, private dialog: MatDialog, private authService: AuthService) { }
  deleteTodoList(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ModalDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((x) => {
      if (x) {
        this.toDoListService.Delete(id).subscribe(res => {
          this.toDoListService.getToDoLists(this.authService.getCurrentUser()._id);
          console.log('Deleted');
          this.ngOnInit();
        });
      }
    });
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
    this.toDoListService.getToDoLists(this.authService.getCurrentUser().firebaseUid).subscribe(
      (res) => {
        console.log(res);
        this.toDoLists = res;
      },);
  }



  editTodoList(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.toDoListService.getToDoListById(id).subscribe(
      (res) => {
        this.toDoList = res;
        console.log(this.toDoList);
        dialogConfig.data = this.toDoList;
        this.dialog.open(ModalEditComponent, dialogConfig).afterClosed().subscribe(
          (res: ToDoList) => {
            this.toDoList = res;
            this.ngOnInit();
          }
        );


      }
    );

  }

}