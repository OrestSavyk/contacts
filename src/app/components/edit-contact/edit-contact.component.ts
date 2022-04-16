import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  contact: Contact;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contact = this.contactsService.editContact$.getValue();
  }
}
