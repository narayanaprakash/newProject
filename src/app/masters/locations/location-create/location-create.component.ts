import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {
LocationForm: FormGroup;
isSaveBtnLoading:boolean=false;
isSaveCBtnLoading:boolean=false;
disableBtn:boolean = false;
  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder, 
    private userservice: UserService,
    private router: Router,
    private notifyService: NotificationService) { }
  get f() { return this.LocationForm.controls; }
  ngOnInit(): void {
      this.LocationForm = this.formBuilder.group({
            location:[''],
        });
      this.titleService.setTitle('Create Location - GCC | SMART PARKING SYSTEM');
  }
  onSubmit(event:any) {
    this.disableBtn=true;
    if(event == '1')
    {
       this.isSaveBtnLoading=true;
    }
    else
    {
       this.isSaveCBtnLoading=true;
    }
    const result = Object.assign({}, this.LocationForm.value);
     // console.log(event)
     // this.ParkingblogForm.reset();
    const formArray=[{"0":'location',"1":'Location field is required'}];
    var Errormsgs=[]
    formArray.forEach(function (value,index) {
      var keyofval=value['0'];
      if(result[keyofval] =='')
      {
        Errormsgs.push(value['1']);
      }
    }); 
    if(Errormsgs.length > 1)
    {
        this.notifyService.showError("Please fill all required feilds", "");
        this.disableBtn=false;
        if(event == '1')
        {
           this.isSaveBtnLoading=false;
        }
        else
        {
           this.isSaveCBtnLoading=false;
        }
    }
    else
    {
        for (let j = 0; j < Errormsgs.length; j++) 
        {
            this.notifyService.showError(Errormsgs[j], "");
        }
        this.disableBtn=false;
        if(event == '1')
        {
           this.isSaveBtnLoading=false;
        }
        else
        {
           this.isSaveCBtnLoading=false;
        }
    }
    if(Errormsgs.length ==0)
    {
      const insDataArr={
          'location':result.location,
          'deleted':'1',
          'status':'1',
          'createdate':'',
          'lastupdate':'',            
        };
        // console.log(insDataArr);
        this.userservice.getData(insDataArr, "locations/create", "POST").subscribe((response:any) => 
        {
           // console.log(response);
            this.disableBtn=false;
            if(event == '1')
            {
               this.isSaveBtnLoading=false;
            }
            else
            {
               this.isSaveCBtnLoading=false;
            }
           if(response.status ==1)
           {
              this.notifyService.showSuccess(response.message, "");
              if(event == '1')
              {
                 this.router.navigate(['masters/locations']);
              }
           }
           else
           {
              this.notifyService.showError(response.message, "");
              this.disableBtn=false;
              if(event == '1')
              {
                 this.isSaveBtnLoading=false;
              }
              else
              {
                 this.isSaveCBtnLoading=false;
              }
           }
        }, (err) => 
        {
          this.notifyService.showError("Internal Server Error", "");
          this.disableBtn=false;
          if(event == '1')
          {
             this.isSaveBtnLoading=false;
          }
          else
          {
             this.isSaveCBtnLoading=false;
          }
        }); 
    } 
  }
}
