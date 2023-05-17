import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoList } from 'app/models/to-do-list';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  toDoList: ToDoList;
  editIndex: number = -1;
  constructor(private dialogRef: MatDialogRef<ModalViewComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.toDoList = data;
  }
  taskForms: FormGroup[] = [];
  initForms() {
    this.toDoList.tasks.forEach((row) => {
      const formGroup = new FormGroup({
        title: new FormControl(row.title),
        priority: new FormControl(row.priority),
        status: new FormControl(row.status)
      });
      this.taskForms.push(formGroup);
    });
  }
  editMode(index: number) {
    this.editIndex = index;
    console.log("edit mode")
  }
  cancelEdit(id: number) {
      this.editIndex = -1;
  }
  editTask(id: String, index: number) {
    console.log(this.taskForms[index].value);
  }
  ngOnInit(): void {
    this.initForms();
  }

}
