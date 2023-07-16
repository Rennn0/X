import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatIconModule } from '@angular/material/icon'
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatIconModule,
        LazyLoadImageModule
    ],
    exports: [ProfileComponent]
})
export class ProfileModule { }

