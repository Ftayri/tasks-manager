import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDeleteComponent } from 'app/modal-delete/modal-delete.component';
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


  constructor(private todolistser: ToDoListService, private dialog: MatDialog) { }

  ngOnInit() {
    this.todolistser.getToDoLists("362a9yi8bAZEG3gVoRIa91dVerS2").subscribe(
      (res) => {
        console.log(res);
        this.todolists = res;
      },);


  }
  deleteTodoList(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ModalDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((x) => {
      if (x) {
        this.todolistser.Delete(id).subscribe(res => {
          this.todolistser.getToDoLists("362a9yi8bAZEG3gVoRIa91dVerS2");
          console.log('Deleted')
        });
      }
      this.ngOnInit();

      //3. if retour confirm
    });
  }
}

