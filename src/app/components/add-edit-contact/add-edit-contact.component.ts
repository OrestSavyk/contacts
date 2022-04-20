import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import {
  ContactsService,
  MODEL_CONTACT,
} from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss'],
})
export class AddEditContactComponent implements OnInit, OnDestroy {
  contact: Contact;

  isEditContact: boolean;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.isEditContact = this.contactsService.isEditContact$.getValue();

    this.contact = this.contactsService.editContact$.getValue();
  }

  ngOnDestroy(): void {
    this.contactsService.isEditContact$.next(false);

    this.contactsService.editContact$.next(MODEL_CONTACT);
  }
}
