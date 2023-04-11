import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./forms/login/login.component";
import {RegisterComponent} from "./forms/register/register.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AddTripComponent} from "./pages/add-trip/add-trip.component";
import {ActivityTileComponent} from "./components/activity-tile/activity-tile.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: NavComponent,
    children: [
      {
        path: "calendar",
        component: HomePageComponent
      },
      {
        path: "add-trip",
        component: AddTripComponent
      },
      {
        path: ":tripId",
        component: ActivityTileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
