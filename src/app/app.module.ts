import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutesComponent } from './components/routes/routes.component';
import { MyRoutesComponent } from './components/my-routes/my-routes.component';
import { AddRouteComponent } from './components/add-route/add-route.component';
import { OneRouteComponent } from './components/one-route/one-route.component';
import { UpdateRouteComponent } from './components/update-route/update-route.component';
import { OwnRoutesComponent } from './components/own-routes/own-routes.component';
import { FavoriteRoutesComponent } from './components/favorite-routes/favorite-routes.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RoutesComponent,
    MyRoutesComponent,
    AddRouteComponent,
    OneRouteComponent,
    UpdateRouteComponent,
    OwnRoutesComponent,
    FavoriteRoutesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
