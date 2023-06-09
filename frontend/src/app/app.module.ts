import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalViewComponent } from './modal-view/modal-view.component';
import { ModalTaskComponent } from './modal-task/modal-task.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';

import { MatButtonModule } from '@angular/material/button';
import { FirebaseModule } from '../../FirebaseModule';
import { LoginComponent } from './login/login.component';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FirebaseModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ModalDeleteComponent,
    ModalViewComponent,
    ModalTaskComponent,
    ModalEditComponent,
    LoginComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
