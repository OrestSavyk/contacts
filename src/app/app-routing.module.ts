import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';
import { ContactsLandingComponent } from './components/contacts-landing/contacts-landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContactsLandingComponent },
  { path: 'contact', component: AddEditContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
