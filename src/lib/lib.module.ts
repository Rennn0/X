import { LoginComponent } from "./components/login/login.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxTypedJsModule } from "ngx-typed-js";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UploadComponent } from './components/upload/upload.component';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ChatComponent } from './components/chat/chat.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollingModule } from "@angular/cdk/scrolling";
@NgModule({
        declarations: [LoginComponent, UploadComponent, ChatComponent],
        imports: [
                NgxTypedJsModule,
                MatExpansionModule,
                HttpClientModule,
                CommonModule,
                ReactiveFormsModule,
                MatIconModule,
                FormsModule,
                NgOptimizedImage,
                RouterModule,
                MatProgressBarModule,
                ScrollingModule
        ],
})
export class LibModule { }
