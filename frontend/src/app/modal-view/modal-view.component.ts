import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoList } from 'app/models/to-do-list';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {

  toDoList: ToDoList;
  constructor(private dialogRef: MatDialogRef<ModalViewComponent>, @Inject(MAT_DIALOG_DATA) data:any) {
    this.toDoList = data;
  }

  ngOnInit(): void {
    console.log(this.toDoList);
  }

}
