import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgot-password.component';
import { ResetPasswordComponent } from './components/resetpassword/reset-password.component';
import { VerifyUserComponent } from './components/verifyuser/verify-user.component';
import { NotesComponent } from './components/notes/notes.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetpassword/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'verify/:token',
    component: VerifyUserComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, children: [
      {
        path: '', component: NotesComponent
      },
      {
        path: 'notes', redirectTo: '/dashboard', pathMatch: 'full'
      },
      {
        path: 'trash', component: TrashComponent
      },
      {
        path: 'archive', component: ArchiveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
