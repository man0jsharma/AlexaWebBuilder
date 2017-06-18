import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-generalform',
  templateUrl: './generalform.component.html',
  styleUrls: ['./generalform.component.css'],
  providers: [ContactService]
})
export class GeneralformComponent implements OnInit {
  showSignIn: boolean = true;
  showSignUp: boolean = false;
  showPills: boolean = false;
  showVideo: boolean = false;
  changeBackGround: string;
  isDisabled: boolean = true;
  constructor(private contactService: ContactService,
    private http: Http
  ) { }

  ToggleForm() {
    this.contactService.getGenerateFormData()
      .subscribe(result => {
        console.log(result[result.length - 1]);
        var latest = result[result.length - 1];
        this.showSignIn = latest.showSignIn,
        this.showSignUp = latest.showSignUp,
        this.showPills = latest.showPills
      });
  }

  addContact() {
    console.log("addContact");
  }

  ChangeSize() {
    this.isDisabled = false;
  }

  ngOnInit() {
   setInterval(() => this.ToggleForm(), 5000);
  }

}