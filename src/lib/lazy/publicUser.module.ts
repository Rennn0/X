import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PublicUserComponent } from "../components/public-user/public-user.component";
import { PublicUserRoutingModule } from "./publicUser-routing.module";
import { Loading } from "../components/loading.component";


@NgModule({
    declarations: [PublicUserComponent],
    exports: [PublicUserComponent],
    imports: [
        CommonModule,
        PublicUserRoutingModule,
        Loading,

    ]
})
export class PublicUserModule { };