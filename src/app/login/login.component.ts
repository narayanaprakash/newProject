import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery' 
import { UserGlobalService} from '../services/user.global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  UserLoginForm: FormGroup;
  userNameLength:number=0;
  isLoading:boolean = false;
  disableBtn:boolean = false;
  UserData=[];
  fullName:string='';
  constructor( 
    private formBuilder: FormBuilder, 
    private userservice: UserService,
    private router: Router,
    private notifyService: NotificationService
    ) {
    this.UserLoginForm = this.formBuilder.group({
            username: '',
            password: '',
            _X: '',
            _M: ''
        });
  }

  ngOnInit(): void {
        // $('#side-menu').metisMenu();
    // if(window.sessionStorage.getItem("user_id"))
    // {
    //   this.router.navigate(['dashboard']);
    // }
    this.disableBtn = true;
    }
    onKeyUp(event:any){
    const result = Object.assign({}, this.UserLoginForm.value);
    if(result.username.length > 0 && result.password.length > 0)
    {
      this.disableBtn = false;
    }
    else
    {
      this.disableBtn = true;
    }
  }
  onSubmit() {
    const result = Object.assign({}, this.UserLoginForm.value);
    this.isLoading = true;
    console.log(result)
    if(result.username.length > 0 && result.password.length > 0)
    {
        this.userservice.getData({ email:result.username,password:result.password}, "users/login", "POST").subscribe((response:any) => 
        {
          // console.log(response);
          if(response['status'] == '1')
          {
           this.UserData =response['data'];
           // console.log(this.UserData['firstname'])
           if(this.UserData)
           {
               sessionStorage.setItem("user_id",this.UserData['id']);
               this.fullName= this.UserData['firstname']+' '+this.UserData['lastname'];
               sessionStorage.setItem("user_name",this.fullName);
               sessionStorage.setItem("reloadtype",'1');
               this.notifyService.showSuccess("Logged Successfully", "");
               this.isLoading = false; 
               this.router.navigate(['dashboard']);
           }
           else
           {
             // console.log('1')
             this.notifyService.showError("Username Or Password Invalid", "Error");
             this.isLoading = false;
           }
          }
          else
          {
            // console.log('2')
            this.notifyService.showError("Username Or Password Invalid", "");
            this.isLoading = false;
          }
        }, (err) => 
        {
          this.notifyService.showWarning("Internal Server Error", "")
          this.isLoading = false;
        });  
    }
    else
    {
      this.notifyService.showError("Please fill all required fields", "")
      this.isLoading = false;
    }
  }
}
