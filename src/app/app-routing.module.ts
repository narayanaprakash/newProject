import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Layout
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { LocationCreateComponent } from './masters/locations/location-create/location-create.component';
import { LocationUpdateComponent } from './masters/locations/location-update/location-update.component';
import { LocationListComponent } from './masters/locations/location-list/location-list.component';
const appRoutes: Routes = [
    { 
        path: '', 
        component: SiteLayoutComponent, 
        children: [
          { path: 'dashboard', component: LoginComponent, pathMatch: 'full'},
        ]
    },
    //Dashboard
    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'dashboard', component: DashboardComponent },
        ]
    },
    //Locations
    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'masters/locations', component: LocationListComponent},
        ]
    },
    //Create Location
    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'masters/locations/create', component: LocationCreateComponent},
        ]
    },
    //Edit Location
    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'masters/locations/edit', component: LocationUpdateComponent},
        ]
    }
];

export const routing = RouterModule.forRoot(appRoutes,{
    useHash: true,
    scrollPositionRestoration: 'enabled'
  });

// export class AppRoutingModule { 
// }