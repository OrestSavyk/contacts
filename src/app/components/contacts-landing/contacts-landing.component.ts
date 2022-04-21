import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-contacts-landing',
  templateUrl: './contacts-landing.component.html',
  styleUrls: ['./contacts-landing.component.scss'],
})
export class ContactsLandingComponent implements OnInit {
  contacts: Contact[] = [];

  searcherValue = '';

  constructor(
    private contactsService: ContactsService,

    public dialog: MatDialog,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.setLocalStorage();

    this.loadContacts();
  }

  loadContacts() {
    this.contacts = this.contactsService.getContactsFromLocalStorage();
  }

  setLocalStorage() {
    this.contactsService.setLocalStorage();
  }

  openDialog(data: Contact): void {
    const dialogRef = this.dialog.open(ModalComponent, { data });
  }

  searcher() {
    const contacts = [...JSON.parse(localStorage.getItem('contacts'))];

    this.contacts = contacts.filter((res) => {
      let name = res.firstName + '' + res.lastName;

      return name

        .toLowerCase()

        .match(this.searcherValue.replace(/\s+/g, '').trim().toLowerCase());
    });
  }

  clearSearcher() {
    this.searcherValue = '';

    this.loadContacts();
  }

  navigateToAddContact() {
    this.router.navigate(['contact']);
  }

  navigateToEditContact(contact: Contact) {
    this.contactsService.isEditContact$.next(true);

    this.contactsService.editContact$.next(contact);

    this.router.navigate(['contact']);
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
