import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IUserSignIn, IUserDetails } from '../UserDetails';
import { RegisterUserService } from '../register-user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public updateUserForm: FormGroup;
  public signInDetails: IUserSignIn;
  public updatedDetails: IUserDetails;
  showUpdateInfoForm: boolean;
  public username: string;
  public isSubmitted = false;
  public isSignedIn = false;
  startDate: any;
  public todaysDate = new Date();
  constructor(private router: Router, private signInService: RegisterUserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.showUpdateInfoForm = false;
    this.initForm();
    this.initUpdateForm();
    this.signInDetails = {};
    this.updatedDetails = {};
  }

  public initForm() {
    // this.signInForm = new FormGroup({
    //   password: new FormControl(''),
    //   username: new FormControl(''),
    // });
    this.signInForm = this.fb.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  public initUpdateForm() {
    this.updateUserForm = this.fb.group({
      address: ['', Validators.required],
      emailID: ['', Validators.required],
      firstName: ['', Validators.required],
      lastDonated: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }
  onClickSignIn() {
    this.isSignedIn = true;
    if (this.signInForm.valid) {
      const user = this.signInForm.controls.username.value;
      this.signInDetails.username = user.trim();
      this.signInDetails.password = this.signInForm.controls.password.value;
      this.signInService.signInUser(this.signInDetails).subscribe((data) => {
        console.log('data is -- ', data);
        if (data && data.username) {
          this.autoPopulateInfoForm(data);
          this.showUpdateInfoForm = true;
        }
        if (data.status === 'User not verified') {
          alert('Looks like you have not verified your email account, please check inbox and click on the link given');
        }
        if (data.status === 'Invalid user') {
          alert('Oooops, Wrong Username/Password');
        }
        // }
      });
    }
    // const user = this.signInForm.controls.username.value;
    // this.signInDetails.username = user.trim();
    // this.signInDetails.password = this.signInForm.controls.password.value;
    // this.signInService.signInUser(this.signInDetails).subscribe((data) => {
    //   console.log('data is -- ', data);
    //   if (data && data.username) {
    //     this.autoPopulateInfoForm(data);
    //     this.showUpdateInfoForm = true;
    //   }
    //   if (data.status === 'User not verified') {
    //     alert('Looks like you have not verified your email account, please check inbox and click on the link given');
    //   }
    //   if (data.status === 'Invalid user') {
    //     alert('Oooops, Wrong Username/Password');
    //   }
    //   // }
    // });
  }

  autoPopulateInfoForm(userInfo: IUserDetails) {
    this.startDate = userInfo.lastDonated;
    console.log('userInfo is -- ', userInfo);
    this.updateUserForm.controls.address.patchValue(userInfo.address);
    this.updateUserForm.controls.emailID.patchValue(userInfo.emailID);
    this.updateUserForm.controls.firstName.patchValue(userInfo.firstName);
    this.updateUserForm.controls.lastName.patchValue(userInfo.lastName);
    this.updateUserForm.controls.mobileNumber.patchValue(userInfo.mobileNumber);
    this.updateUserForm.controls.password.patchValue(userInfo.password);
    this.updateUserForm.controls.username.patchValue(userInfo.username);

  }

  onClickCancel() {
    this.router.navigateByUrl('');
  }

  onClickUpdate() {
    this.isSubmitted  = true;
    if (this.updateUserForm.valid) {
      this.updatedDetails.address = this.updateUserForm.controls.address.value;
      this.updatedDetails.firstName = this.updateUserForm.controls.firstName.value;
      this.updatedDetails.lastName = this.updateUserForm.controls.lastName.value;
      this.updatedDetails.lastDonated = this.updateUserForm.controls.lastDonated.value;
      this.updatedDetails.mobileNumber = this.updateUserForm.controls.mobileNumber.value;
      this.updatedDetails.username = this.updateUserForm.controls.username.value;
      this.signInService.updateUserInfo(this.updatedDetails).subscribe((data) => {
          alert('Your information in updated SUCCESSFULLY');
          this.router.navigateByUrl('');
      });
    }
  }
}
