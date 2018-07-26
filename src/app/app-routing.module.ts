import { AuthGuard } from './authguard';
import { LoginComponent } from './login/login.component';
import { PhonelistComponent } from './phonelist/phonelist.component';
import { RosterComponent } from './roster/roster.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'roster', pathMatch: 'full' },
  { path: 'roster', component: RosterComponent , canActivate: [AuthGuard]},
  { path: 'phonelist', component: PhonelistComponent }, //, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { 
  
  
}