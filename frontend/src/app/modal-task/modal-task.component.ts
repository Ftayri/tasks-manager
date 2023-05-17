import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoListService } from 'app/services/to-do-list.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {

  form: FormGroup;
  priorities: string[] = ['low', 'normal', 'high'];
  status: string[] = ['pending', 'completed'];
  toDoListId: string;
  constructor(private dialogRef: MatDialogRef<ModalTaskComponent>, @Inject(MAT_DIALOG_DATA) data, private todoListService: ToDoListService) { 
    this.toDoListId = data;
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      status: new FormControl("pending"),
    });
  }

  onSubmit() {
    if (this.form.valid) {
        this.todoListService.addTask(this.toDoListId, this.form.value).subscribe(
          (res) => {
            this.dialogRef.close(res);
          }
        )
    }
  }

}
