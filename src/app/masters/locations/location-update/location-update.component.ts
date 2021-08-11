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
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnInit {
LocationForm: FormGroup;
isSaveBtnLoading:boolean=false;
disableBtn:boolean = false;
islocationLoading:boolean=false;
locationData=[];
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
      this.titleService.setTitle('Edit Location - GCC | SMART PARKING SYSTEM');
      this.userservice.getData({status:"1",deleted:"1",process:'1'}, "locations/check", "POST").subscribe((response:any) => 
      {
        this.islocationLoading=true;
        // console.log(response['data'][0]['zone'])
        // this.locationData   = response['data'][0]       
        
      }, (err) => 
      {
        // this.pageLoading = true;
      });
  }
  onSubmit(event:any) {
    this.disableBtn=true;
    if(event == '1')
    {
       this.isSaveBtnLoading=true;
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
 
    }
    if(Errormsgs.length ==0)
    {
      const upDataArr={
          'location':result.location,
          'deleted':'1',
          'status':'1',
          'createdate':'',
          'lastupdate':'',            
        };
        // console.log(insDataArr);
        this.userservice.getData(upDataArr, "locations/update", "POST").subscribe((response:any) => 
        {
           // console.log(response);
            this.disableBtn=false;
            if(event == '1')
            {
               this.isSaveBtnLoading=false;
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
           }
        }, (err) => 
        {
          this.notifyService.showError("Internal Server Error", "");
          this.disableBtn=false;
          if(event == '1')
          {
             this.isSaveBtnLoading=false;
          }
        }); 
    } 
  }
}
