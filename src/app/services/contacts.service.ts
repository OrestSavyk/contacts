import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact';

const contacts: Contact[] = [
  {
    id: 'f538cecb-9a46-4c2f-bae6-3cc118754131',
    firstName: 'Andriy',
    lastName: 'Way',
    phoneNumber: '380983802378',
    email: 'andryiway@gmail.com',
    address: 'str Heroiv4',
    birth: '2020-12-22T22:00:00.000Z',
  },
  {
    id: '31ece2bd-ff7c-4f5e-9ccb-3d62e63d8f7d',
    firstName: 'Oleg',
    lastName: 'Berezovskyi',
    phoneNumber: '380975802379',
    email: 'olegberez@gmail.com',
    address: 'str 24',
    birth: '2020-12-22T22:00:00.000Z',
  },
  {
    id: '31ece2bd-ff7c-4f5e-9ccb-3d68e61d8f7d',
    firstName: 'Maxym',
    lastName: 'Prystash',
    phoneNumber: '380973302387',
    email: 'maxympr@gmail.com',
    address: 'Heroiv Upa 2',
    birth: '2020-12-22T22:00:00.000Z',
  },
  {
    id: '31ece2bd-ff7c-4f9e-9ccb-3d68e66d8f7d',
    firstName: 'Ivan',
    lastName: 'Scope',
    phoneNumber: '380983892387',
    email: 'maxympr@gmail.com',
    address: 'Heroiv Upa 2',
    birth: '2020-12-22T22:00:00.000Z',
  },
  {
    id: '33ece2bd-ff7c-4f5e-3ccb-3d68e66d8f7d',
    firstName: 'Bohdan',
    lastName: 'Sydorenko',
    phoneNumber: '380973862383',
    email: 'maxympr@gmail.com',
    address: 'Heroiv Upa 2',
    birth: '2020-12-22T22:00:00.000Z',
  },
  {
    id: '39ece2bd-ff4c-4f5e-9ccb-3d68e66d8f7d',
    firstName: 'Orest',
    lastName: 'Mik',
    phoneNumber: '380953802325',
    email: 'maxympr@gmail.com',
    address: 'Heroiv Upa 2',
    birth: '2020-12-22T22:00:00.000Z',
  },
];

export const MODEL_CONTACT: Contact = {
  id: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address: '',
  birth: '',
};

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  isEditContact$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  editContact$: BehaviorSubject<Contact> = new BehaviorSubject(MODEL_CONTACT);

  constructor() {}

  getContacts() {
    return of<Contact[]>(contacts);
  }

  getContactsFromLocalStorage(): Contact[] {
    return [...JSON.parse(localStorage.getItem('contacts'))];
  }

  setLocalStorage() {
    if (!JSON.parse(localStorage.getItem('contacts'))) {
      return localStorage.setItem('contacts', JSON.stringify([...contacts]));
    }
  }
}
