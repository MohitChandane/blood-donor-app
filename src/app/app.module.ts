import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserService } from './register-user.service';

@NgModule({
   declarations: [
      AppComponent,
      LandingComponent,
      RegisterComponent,
      SignInComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, RegisterUserService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
