import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatIconModule } from '@angular/material/icon'
import { NgLazyImagesModule } from 'ng-lazy-images';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatIconModule,
        NgLazyImagesModule,
        NgxSkeletonLoaderModule
    ],
    exports: [ProfileComponent]
})
export class ProfileModule { }

