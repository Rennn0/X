import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error } from 'src/lib/components/error.component';
import { LoginComponent } from 'src/lib/components/login/login.component';
import { UploadComponent } from 'src/lib/components/upload/upload.component';
import { profileAuthGuard } from 'src/lib/services/profile-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile/:username',
    loadChildren: () => import("../lib/lazy/profile.module").then(m => m.ProfileModule),
    // canActivate: [profileAuthGuard],
  },
  // {
  //   path: 'user/:public',
  //   loadChildren: () => import("../lib/lazy/publicUser.module").then(m => m.PublicUserModule)
  // },
  { path: 'upload', component: UploadComponent },
  { path: '**', component: Error }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
