import { Injectable } from '@angular/core';
import{Http, Headers} from '@angular/http';
import{Contact} from './contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  //Retrieving ContactService

  getContact()
  {
    return this.http.get('http://localhost:3000/api/contacts')
      .map(res => res.json());
  }

  //add contact method
  addContact(newContact)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contact',newContact, {headers:headers})
      .map(res => res.json());
  }

  //delete contact
  deleteContact(id)
  {
    return this.http.delete('http://localhost:3000/api/contact/'+ id)
    .map(res => res.json());
  }

  updateContact(newContact)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/contact/',newContact, {headers:headers})
  }



 getAlexa()
  {
    return this.http.get('https://morning-bastion-58963.herokuapp.com/form')
      .map(res => res.json());
  }


  getAlexaData()
  {
    return this.http.get('http://localhost:3000/api/alexa')
      .map(res => res.json());
  }


  getGenerateFormData()
  {
    return this.http.get('http://localhost:3000/api/generateform')
      .map(res => res.json());
  }


  updateGenerateFormData()
  {
    console.log('updateGenerateFormData');
    var headers = new Headers();
    var newform = {};
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/putgenerateForm', newform,{headers:headers})
  }


}
