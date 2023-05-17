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
import { ModalEditComponent } from './modal-edit/modal-edit.component';

import { MatButtonModule } from '@angular/material/button';



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
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ModalDeleteComponent,
    ModalViewComponent,
    ModalEditComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
