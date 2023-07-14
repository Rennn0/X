import { LoginComponent } from "./components/login/login.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxTypedJsModule } from "ngx-typed-js";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
        declarations: [LoginComponent],
        imports: [
                NgxTypedJsModule,
                MatExpansionModule,
                HttpClientModule,
                CommonModule,
                ReactiveFormsModule,
        ],
})
export class LibModule { }
