import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/lib/components/login/login.component';
import { ProfileComponent } from 'src/lib/components/profile/profile.component';

const routes: Routes = [{ path: '', component: LoginComponent }, { path: 'profile', component: ProfileComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
