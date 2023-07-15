import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicUserComponent } from "../components/public-user/public-user.component";

const routes: Routes = [{ path: '', component: PublicUserComponent }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicUserRoutingModule { };