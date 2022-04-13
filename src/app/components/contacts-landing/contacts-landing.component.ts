import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-contacts-landing',
  templateUrl: './contacts-landing.component.html',
  styleUrls: ['./contacts-landing.component.scss'],
})
export class ContactsLandingComponent implements OnInit {
  defaultContacts: Contact[] = [];

  contacts: Contact[] = [];

  queryValue = '';

  constructor(
    private contactsService: ContactsService,

    public dialog: MatDialog,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDefaultContacts();

    this.setLocalStorage();

    this.loadContacts();
  }

  loadContacts() {
    this.contacts = [...JSON.parse(localStorage.getItem('contacts'))];
  }

  setLocalStorage() {
    if (!JSON.parse(localStorage.getItem('contacts'))) {
      localStorage.setItem(
        'contacts',
        JSON.stringify([...this.defaultContacts])
      );
    }
  }

  loadDefaultContacts() {
    this.contactsService
      .getContacts()
      .subscribe((res) => (this.defaultContacts = res));
  }

  openDialog(data: Contact): void {
    const dialogRef = this.dialog.open(ModalComponent, { data });
  }

  query() {
    const contacts = [...JSON.parse(localStorage.getItem('contacts'))];

    this.contacts = contacts.filter((res) => {
      let name = res.firstName + '' + res.lastName;
      return name
        .toLowerCase()
        .match(this.queryValue.replace(/\s+/g, '').trim().toLowerCase());
    });
  }

  clearQuery() {
    this.queryValue = '';

    this.loadContacts();
  }

  addContact() {
    this.router.navigate(['add-contact']);
  }

  editContact(contact: Contact) {
    this.contactsService.editContact$.next(contact);

    this.router.navigate(['edit-contact']);
  }

  deleteContact(id: string) {
    const contacts: Contact[] = [
      ...JSON.parse(localStorage.getItem('contacts')),
    ];

    const updatedContacts = contacts.filter((item) => item.id !== id);

    this.contacts = updatedContacts;

    localStorage.clear();

    localStorage.setItem('contacts', JSON.stringify([...updatedContacts]));
  }
}
