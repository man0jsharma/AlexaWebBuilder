import { Component, OnInit } from '@angular/core';
import { ContactService} from '../contact.service';
import { Contact} from '../contact';

@Component({
  selector: 'app-contacts', 
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;
  updatingId: any;
  constructor(private contactService: ContactService) { }

  addContact()
  {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact)
    .subscribe(contact => {
      this.contacts.push(contact);
      this.contactService.getContact()
      .subscribe(contacts =>
      this.contacts = contacts);     
    });
  }
  
  saveContact()
  {
    var contacts = this.contacts;
    for(var i = 0; i < contacts.length; i++)
    {
      if(contacts[i]._id == this.updatingId)
        {
           contacts[i].first_name = this.first_name;
           contacts[i].last_name = this.last_name;
           contacts[i].phone = this.phone 
        }
    }

  }

  updateContact(id:any)
  {
    var contacts = this.contacts;
    this.updatingId = id;
    for(var i = 0; i < contacts.length; i++)
    {
      if(contacts[i]._id == id)
        {
          this.first_name = contacts[i].first_name;
          this.last_name = contacts[i].last_name;
          this.phone = contacts[i].phone;
        }
    }

  }

  deleteContact(id:any)
  {
    var contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(data => {
        if(data.n == 1)
          {
            for(var i = 0; i < contacts.length; i++)
              {
                if(contacts[i]._id == id)
                  {
                    contacts.splice(i, 1);
                  }
              }
          }
      });
  }
  ngOnInit() {
    this.contactService.getContact()
      .subscribe(contacts =>
      this.contacts = contacts);

  }

}
