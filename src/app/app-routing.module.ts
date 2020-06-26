import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutesComponent } from './components/routes/routes.component';

import { AuthGuard } from './guard/auth.guard';
import { MyRoutesComponent } from './components/my-routes/my-routes.component';
import { AddRouteComponent } from './components/add-route/add-route.component';
import { OneRouteComponent } from './components/one-route/one-route.component';
import { UpdateRouteComponent } from './components/update-route/update-route.component';
import { OwnRoutesComponent } from './components/own-routes/own-routes.component';
import { FavoriteRoutesComponent } from './components/favorite-routes/favorite-routes.component';


const routes: Routes = [
  { path: 'home', pathMatch: 'full', redirectTo: '/home/routes' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'routes', component: RoutesComponent },

      {
        path: 'accountroutes', component: OwnRoutesComponent, canActivate: [AuthGuard], children: [
          { path: 'myroutes/:id', component: MyRoutesComponent, canActivate: [AuthGuard] },
          { path: 'favoriteroutes', component: FavoriteRoutesComponent, canActivate: [AuthGuard] }

        ]
      },
      { path: 'add-route', component: AddRouteComponent, canActivate: [AuthGuard] },
      { path: 'update/:id', component: UpdateRouteComponent, canActivate: [AuthGuard] },
      { path: ':id', component: OneRouteComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: '/home/routes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
