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
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
_offset=0;
page: number=1;
itemsPerPage = 10;
itemsTotal = 0;
locationData :any = [];
loaddefaultData :any = [];
pageLoading:boolean=false;

constructor
(
  private titleService: Title,
  private userservice: UserService,
  private router: Router,
  private notifyService: NotificationService) { }

ngOnInit(): void {
  for (let j = 1; j <= this.itemsPerPage; j++) 
  {
      this.loaddefaultData.push({
          id: j,
      });
  }
  this.userservice.getData({offset:this._offset,limit:this.itemsPerPage,process:'1'}, "locations/locationPaginate", "POST").subscribe((response:any) => 
    {
      console.log(response)
      if(response['status'] == '1')
      {
        this.pageLoading = true;
        const locationDataArr =response['data'];
        this.itemsTotal=locationDataArr['total'];
        this._offset=locationDataArr['offset'];
        this.locationData=locationDataArr['docs'];
      }
    }, (err) => 
    {
      this.pageLoading = true;
    });
}
getPage(page) 
{
  this.pageLoading = false;

  window.scroll(1,1);
  if(page==1)
  {
    this._offset = 0 
    var nextoffset=this._offset; 
  }
  else
  {
    this._offset = (page - 1) * this.itemsPerPage
    var nextoffset=this._offset;
  }

  this.userservice.getData({offset:nextoffset,limit:this.itemsPerPage,process:'1'}, "locations/locationPaginate", "POST").subscribe((response:any) => 
    {
      console.log(response)
      if(response['status'] == '1')
      {
        this.pageLoading = true;
        const locationDataArr =response['data'];
        this.itemsTotal=locationDataArr['total'];
        this._offset=locationDataArr['offset'];
        this.locationData=locationDataArr['docs'];
      }
    }, (err) => 
    {
      this.pageLoading = true;
    });
}

}
