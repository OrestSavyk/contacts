import { Component, OnDestroy } from '@angular/core';
import { ContactsService } from './services/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'contacts';

  constructor(private contactsService: ContactsService) {}

  ngOnDestroy(): void {
    this.contactsService.isEditContact$.unsubscribe();

    this.contactsService.editContact$.unsubscribe();
  }
}
