import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { ToDoListService } from 'app/services/to-do-list.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form!: FormGroup;

  constructor(private toDoListService: ToDoListService, private authService: AuthService) { }
  ngOnInit() {
    this.initForm();
  }
  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      dueDate: new FormControl<Date | null>(null),
      description: new FormControl(null, [Validators.required])
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const toDoList = this.form.value;
      this.toDoListService.createToDoList(this.authService.getCurrentUser().firebaseUid, toDoList).subscribe(
        (response: any) => {
          console.log(response);
          this.resetForm();
        }
      );
    }
  }

  resetForm() {
    this.form.reset();

    Object.keys(this.form.controls).forEach(controlName => {
      this.form.get(controlName)?.setErrors(null);
    });
  }

}
