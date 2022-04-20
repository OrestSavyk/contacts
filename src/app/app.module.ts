import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { v4 as uuidv1 } from '../../node_modules/uuid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsLandingComponent } from './components/contacts-landing/contacts-landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InputErrorsComponent } from './components/input-errors/input-errors.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsLandingComponent,
    ModalComponent,
    InputErrorsComponent,
    FormWrapperComponent,
    AddEditContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
