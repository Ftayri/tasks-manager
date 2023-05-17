
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoList } from 'app/models/to-do-list';
import { ToDoListService } from 'app/services/to-do-list.service';


@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  toDoList: ToDoList;
  todoform!: FormGroup;
  constructor(private dialogRef: MatDialogRef<ModalEditComponent>, private formBuilder: FormBuilder, private todoListService: ToDoListService, @Inject(MAT_DIALOG_DATA) data: any) {
    this.toDoList = data;
    this.todoform = this.formBuilder.group({
      title: [this.toDoList.title], // Define the form control for title and initialize it with the existing value
      description: [this.toDoList.description], // Define the form control for description and initialize it with the existing value
      dueDate: [this.toDoList.dueDate],
    }); // Define the form control for dueDate and initialize it with the existing value
  }
  //update todo list by id
  updateTodoList(id: string) {
    this.toDoList.title = this.todoform.value.title;
    this.toDoList.description = this.todoform.value.description;
    this.toDoList.dueDate = this.todoform.value.dueDate;
    this.todoListService.updateToDoList(id, this.toDoList).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(this.toDoList);
      }
    );
  } //end update todo list by id





  ngOnInit(): void {
  }

}
