import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PublicUserComponent } from "../components/public-user/public-user.component";
import { PublicUserRoutingModule } from "./publicUser-routing.module";

@NgModule({
    declarations: [PublicUserComponent],
    imports: [
        CommonModule,
        PublicUserRoutingModule
    ],
    exports: [PublicUserComponent]
})
export class PublicUserModule { };