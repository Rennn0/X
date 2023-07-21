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


@NgModule({
        declarations: [LoginComponent, UploadComponent],
        imports: [
                NgxTypedJsModule,
                MatExpansionModule,
                HttpClientModule,
                CommonModule,
                ReactiveFormsModule,
                MatIconModule,
                FormsModule,
                NgOptimizedImage,
                RouterModule
        ],
})
export class LibModule { }
