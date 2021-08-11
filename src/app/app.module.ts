import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { UserGlobalService } from './services/user.global';
import { HttpClientModule } from '@angular/common/http';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { routing } from './app-routing.module';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { NgApexchartsModule } from "ng-apexcharts";
import { MetismenuAngularModule } from "@metismenu/angular";

const dbConfig: DBConfig  = 
{
    name: 'ds-school-v1.1.1',
    version: 1,
    objectStoresMeta: [
        {
            store: 'setup',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: []
        },
        {
            store: 'search',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: []
        }
    ]
};

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LocationCreateComponent } from './masters/locations/location-create/location-create.component';
import { LocationUpdateComponent } from './masters/locations/location-update/location-update.component';
import { LocationListComponent } from './masters/locations/location-list/location-list.component';


@NgModule({
  declarations: [
    AppComponent, 
    SiteLayoutComponent, 
    SiteHeaderComponent, 
    SiteFooterComponent, 
    LoginComponent, DashboardComponent, LocationCreateComponent, LocationUpdateComponent, LocationListComponent
  ],
  imports: [  MetismenuAngularModule, BrowserModule, BrowserAnimationsModule, routing,ToastrModule.forRoot({timeOut: 3000,positionClass: 'toast-top-right',maxOpened:1,autoDismiss:true}), FormsModule, ReactiveFormsModule, HttpClientModule,BsDatepickerModule.forRoot(), AngularMultiSelectModule, NgMultiSelectDropDownModule.forRoot(),NgxPaginationModule,LazyLoadImageModule, ModalModule.forRoot(), CarouselModule.forRoot(), NgxIndexedDBModule.forRoot(dbConfig)],
  providers: [ UserService, UserGlobalService, Title, ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
