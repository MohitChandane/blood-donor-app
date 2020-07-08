import { RegisterUserService } from './../register-user.service';
// tslint:disable-next-line: ordered-imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// tslint:disable-next-line: ordered-imports
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  public isSubmitted = false;
  public todaysDate = new Date();
  public showLoader = false;
  constructor(private router: Router, private registerUserSer: RegisterUserService,
              private agmCore: AgmCoreModule, private fb: FormBuilder) { }

  public ngOnInit() {
    this.initForm();
    this.userData = {};
  }

  get registerFormControl() {
    return this.detailsForm.controls;
  }
  public onClickCancel() {
    this.router.navigateByUrl('');
    this.hideRegisterPage = true;
  }
  public initForm() {

    this.detailsForm = this.fb.group({
      address: ['', Validators.required],
      emailID: ['', Validators.required],
      firstName: ['', Validators.required],
      lastDonated: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      zipcode: ['', Validators.required],
      bloodgroup: ['', Validators.required]
    });
  }
  public onClickSubmit() {
    this.showLoader = true;
    this.isSubmitted = true;
    if (this.detailsForm.valid) {
      if (navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.longitude = +pos.coords.longitude;
          this.latitude = +pos.coords.latitude;
          this.name = this.detailsForm.controls.firstName.value;
          this.userData.firstName = this.detailsForm.controls.firstName.value;
          this.userData.lastName = this.detailsForm.controls.lastName.value;
          this.userData.mobileNumber = this.detailsForm.controls.mobileNumber.value;
          this.userData.address = this.detailsForm.controls.address.value;
          this.userData.emailID = this.detailsForm.controls.emailID.value;
          this.userData.username = this.detailsForm.controls.username.value;
          this.userData.password = this.detailsForm.controls.password.value;
          this.userData.lastDonated = this.detailsForm.controls.lastDonated.value;
          this.userData.zipcode = this.detailsForm.controls.zipcode.value;
          this.userData.bloodgroup = this.detailsForm.controls.bloodgroup.value;
          this.userData.longitude = this.longitude;
          this.userData.latitude = this.latitude;
          this.registerUserSer.postUserDetails(this.userData).subscribe(data => {
            this.isInvalidEmail = false;
            console.log('dataaaaaaaaaa', this.userData);
            if (data) {
              this.showLoader = false;
              console.log('Verification link sent to email ,please check');
              //   this.detailsForm.reset();
              alert('Verification link sent to email ,please check and verify before logging in');
              this.router.navigateByUrl('');
            } else {
              console.log('invalid email message');
            }
          },
            (error: HttpErrorResponse) => {
              console.log('error occured ', error);
              if (error.error.error === 'Username already exists') {
                this.userNameExists = true;
                this.detailsForm.controls.username.reset();
                alert('Sorry, This username is already taken please chooose another username');
              }
              ///  this.isInvalidEmail = true;
              if (error.error.error === 'Email ID already exists') {
                alert('Sorry, Email ID already exists');
                console.log('Provided invalid Email ID');
              }

            });
        });
      }

    }

  }
}
