import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxTypedJsModule } from "ngx-typed-js";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";




@NgModule({
        declarations: [LoginComponent, ProfileComponent],
        imports: [
                NgxTypedJsModule,
                MatExpansionModule,
                HttpClientModule,
                CommonModule,
                ReactiveFormsModule,
        ],
})
export class LibModule { }
