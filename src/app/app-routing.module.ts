
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
  {
    path: '', component: LandingComponent,

  },
  {
    path: 'register', component: RegisterComponent,

  },
  {
    path: 'signIn', component: SignInComponent,

  },
  {path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}
)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
