import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class DashboardComponent implements OnInit {
  revenueDay:string='Today';
  constructor(
    private titleService: Title,
    private userservice: UserService,
    private router: Router,
    private notifyService: NotificationService) {
  }

    ngOnInit(): void 
    {
      this.titleService.setTitle('Dashboard - School Alpha');
    
    }
};