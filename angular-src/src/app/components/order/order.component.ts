import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {UploadService} from '../../services/upload.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  name: String;
  email: String;
  phoneNo: String;
  file: File;
  projectName: String;
  projectDesc: String;
  
  constructor(
    private validateService: ValidateService, 
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private uploadService:UploadService
  ) { }

  ngOnInit() {
  }

  onOrderSubmit(){
    const order = {
      name: this.name,
      email: this.email,
      phoneNo: this.phoneNo,
      projectName: this.projectName,
      projectDesc: this.projectDesc
    };
    //check for file here
    const file = this.file;


    //Required Fields
    if(!this.validateService.validateOrder(order)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    //Validate Email
    if(!this.validateService.validateEmail(order.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // maybe validate phone number later
    
    //remove this for actual
    this.flashMessage.show('You have sent the order', {cssClass: 'alert-success', timeout: 3000});
    if(this.authService.loggedIn()){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/']);
    }
    /*
    // Submit Data
    this.uploadService.sendOrder(order, file).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You have sent the order', {cssClass: 'alert-success', timeout: 3000});
        if(this.authService.loggedIn()){
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/']);
        }
        
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        if(this.authService.loggedIn()){
          this.router.navigate(['/dashboard']);
        }else{
          this.router.navigate(['/']);
        }

      }
    });*/


  }


}
