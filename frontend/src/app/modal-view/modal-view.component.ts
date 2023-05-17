import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalDeleteComponent } from 'app/modal-delete/modal-delete.component';
import { ModalTaskComponent } from 'app/modal-task/modal-task.component';
import { ToDoList } from 'app/models/to-do-list';
import { TaskService } from 'app/services/task.service';
import { ToDoListService } from 'app/services/to-do-list.service';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  toDoList: ToDoList;
  editIndex: number = -1;
  constructor(private toDoListService: ToDoListService,private taskService: TaskService, private dialogRef: MatDialogRef<ModalViewComponent>, @Inject(MAT_DIALOG_DATA) data: any, private deleteDialog: MatDialog, private createTaskModal: MatDialog) {
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
  }
  cancelEdit(id: number) {
    this.editIndex = -1;
  }
  editTask(id: string, index: number) {
    console.log(this.taskForms[index].value);
    this.taskService.editTask(id, this.taskForms[index].value).subscribe(
      (res) => {
        this.ngOnInit();
      });
  }
  deleteTask(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.deleteDialog.open(ModalDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.taskService.deleteTask(id).subscribe(res => {
          this.ngOnInit();
        }
        );
      }
    });
  }
  openCreateTaskModal() {

    this.createTaskModal.open(ModalTaskComponent, { data: this.toDoList._id }).afterClosed().subscribe(
      (res: ToDoList) => {
        this.ngOnInit();
      }
    );
  }
  close() {
    this.dialogRef.close(this.toDoList);
  }
  ngOnInit(): void {
    this.editIndex=-1;
    this.initForms();
    this.toDoListService.getToDoList(this.toDoList._id).subscribe(
      (res) => {
        this.toDoList = res;
      }
    );
  }

}
