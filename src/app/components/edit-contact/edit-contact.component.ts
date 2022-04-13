import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  contact: Contact;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormValidationService,
    private router: Router,
    private contactsService: ContactsService
  ) {
    this.devCartForm();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentYear - 1, 0, 0);
  }
  ngOnInit(): void {
    this.contact = this.contactsService.editContact$.getValue();
    this.contactForm.patchValue(this.contact);
  }
  private devCartForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      lastName: ['', [Validators.maxLength(15)]],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(100000000),
          Validators.max(10000000000000000),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          this.formService.isValidEmail,
        ]),
      ],
      address: ['', Validators.maxLength(30)],
      birth: [],
    });
  }
  editContact() {
    if (this.contactForm.valid) {
      const editedContact = { id: this.contact.id, ...this.contactForm.value };
      const contacts: Contact[] = [
        ...JSON.parse(localStorage.getItem('contacts')),
      ];
      // contacts.filter(
      //   (item) =>
      //     // (item.id === editedContact.id &&
      //     //   item.phoneNumber !== editedContact.phoneNumber) &&
      //     item.id === editedContact.id &&
      //     item.phoneNumber === editedContact.phoneNumber
      // );
      const newArr = contacts.filter(
        (item) => item.phoneNumber !== this.contact.phoneNumber
      );
      localStorage.clear();
      localStorage.setItem(
        'contacts',
        JSON.stringify([...newArr, editedContact])
      );
      this.contactForm.reset();
      this.router.navigate(['']);
    }
  }
  showErrors(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field.touched && field.invalid;
  }

  getError(field: string): ValidationErrors {
    return this.contactForm.get(field).errors;
  }
}
