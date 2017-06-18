import { ElementRef, Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-generalform',
  templateUrl: './generalform.component.html',
  styleUrls: ['./generalform.component.css'],
  providers: [ContactService]
})
export class GeneralformComponent implements OnInit {
  showSignIn: boolean = false;
  showSignUp: boolean = false;
  showPills: boolean = false;
  showVideo: boolean = false;
  showFooter: boolean = false;
  theme: String;
  changeBackGround: string;
  isDisabled: boolean = true;
  randomNumber: any = -1;


  templates: any;

  constructor(private contactService: ContactService,
    private http: Http,
    private elRef: ElementRef
  ) { }

  generateRandom(min, max, except) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === except) ? this.generateRandom(min, max, except) : num;
  }

  ToggleForm() {
    this.contactService.getGenerateFormData()
      .subscribe(result => {

        this.templates = [
          "https://bootswatch.com/darkly/bootstrap.min.css",
          "https://bootswatch.com/spacelab/bootstrap.min.css",
          "https://bootswatch.com/slate/bootstrap.min.css",
          "https://bootswatch.com/simplex/bootstrap.min.css",
          "https://bootswatch.com/sandstone/bootstrap.min.css"
        ];
        console.log(result[result.length - 1]);
      
        var latest = result[result.length - 1];
        this.showSignIn = latest.showSignIn;
        this.showSignUp = latest.showSignUp;
        this.showPills = latest.showPills;
        this.showFooter = latest.showFooter;
        this.showVideo = latest.showVideo;

        if(latest.changeTemplate)
        {
            this.randomNumber = this.generateRandom(0, 4, this.randomNumber);
            var div = this.elRef.nativeElement.querySelector('link').href = this.templates[this.randomNumber];
            this.contactService.updateGenerateFormData();
        }
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
