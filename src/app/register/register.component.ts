import { RegisterUserService } from './../register-user.service';
// tslint:disable-next-line: ordered-imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// tslint:disable-next-line: ordered-imports
import { FormGroup, FormControl } from '@angular/forms';
import { IUserDetails } from '../UserDetails';
import { HttpErrorResponse } from '@angular/common/http';
// import { google } from '@agm/core/services/google-maps-types';
// import {  } from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public hideRegisterPage: boolean;
  public name: string;
  public detailsForm: FormGroup;
  public userData: IUserDetails;
  public DBdata;
  public isInvalidEmail: boolean;
  userNameExists: boolean;
  public latitude;
  public longitude;

  constructor(private router: Router, private registerUserSer: RegisterUserService,
              private agmCore: AgmCoreModule ) { }

  public ngOnInit() {
    this.initForm();
    this.calculateDistance();
    this.userData = {};
  }
  public onClickCancel() {
    this.router.navigateByUrl('');
    this.hideRegisterPage = true;
  }
  public initForm() {
    this.detailsForm = new FormGroup({
      address: new FormControl(''),
      emailID: new FormControl(''),
      firstName: new FormControl(''),
      lastDonated: new FormControl(''),
      lastName: new FormControl(''),
      mobileNumber: new FormControl(''),
      password: new FormControl(''),
      username: new FormControl(''),
    });
  }

  public onClickSubmit() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.longitude = +pos.coords.longitude;
        this.latitude = +pos.coords.latitude;

        console.log('this.longitude --- ', this.longitude);
        console.log('this.latitude -- ', this.latitude);
      });
    }
    this.name = this.detailsForm.controls.firstName.value;
    this.userData.firstName = this.detailsForm.controls.firstName.value;
    this.userData.lastName = this.detailsForm.controls.lastName.value;
    this.userData.mobileNumber = this.detailsForm.controls.mobileNumber.value;
    this.userData.address = this.detailsForm.controls.address.value;
    this.userData.emailID = this.detailsForm.controls.emailID.value;
    this.userData.username = this.detailsForm.controls.username.value;
    this.userData.password = this.detailsForm.controls.password.value;
    this.userData.lastDonated = this.detailsForm.controls.lastDonated.value;
    this.userData.longitude = this.longitude;
    this.userData.latitude = this.latitude;
   // this.userData.userUniqueID = userUniqueID;
    this.registerUserSer.postUserDetails(this.userData).subscribe(data => {
      this.isInvalidEmail = false;
      console.log('dataaaaaaaaaa', data);
      if (data) {
        console.log('Verification link sent to email ,please check');
     //   this.detailsForm.reset();
        alert('Verification link sent to email ,please check and verify before logging in');
      } else {
        console.log('invalid email message');
      }
    },
      (error: HttpErrorResponse) => {
        console.log('error occured ' , error);
        if (error.error.error === 'Username already exists') {
            this.userNameExists = true;
            this.detailsForm.reset();
            alert('Sorry, This username is already taken please chooose another username');
        }
        ///  this.isInvalidEmail = true;
        if (error.error.error === 'Email ID already exists') {
          alert('Sorry, Email ID already exists');
          console.log('Provided invalid Email ID');
        }

      });

  }

  calculateDistance() {
    const a = new google.maps.LatLng(18.5477155,73.9183243); // (lat, lng)
    const b = new google.maps.LatLng(18.5289, 73.8743);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(a, b);
    console.log('distance from station to aga khan museum is -- ', distance);
  }
}
