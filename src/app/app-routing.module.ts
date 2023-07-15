import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error } from 'src/lib/components/error.component';
import { LoginComponent } from 'src/lib/components/login/login.component';
import { profileAuthGuard } from 'src/lib/services/profile-auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile/:username',
    loadChildren: () => import("../lib/lazy/profile.module").then(m => m.ProfileModule),
    canActivate: [profileAuthGuard],
  },
  { path: '**', component: Error }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
