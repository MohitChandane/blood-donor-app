import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private router: Router, private signInService: RegisterUserService) { }

  ngOnInit() {
    this.showUpdateInfoForm = false;
    this.initForm();
    this.initUpdateForm();
    this.signInDetails = {};
    this.updatedDetails = {};
  }

  public initForm() {
    this.signInForm = new FormGroup({
      password: new FormControl(''),
      username: new FormControl(''),
    });
  }

  public initUpdateForm() {
    this.updateUserForm = new FormGroup({
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
  onClickSignIn() {
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
      // if (data && data.isVerified) {
      //   if (data.password === this.signInDetails.password && data.username === this.signInDetails.username) {
      //       console.log('This is a verified and authentic user');
      //       this.autoPopulateInfoForm(data);
      //       this.showUpdateInfoForm = true;
      //   } else {
      //     alert('Oooops, Wrong Username/Password');
      //   }
      // }
      // if (!data) {
      //   alert('You entered invalid username/password');
      // }
      // if (data && !data.isVerified) {
      //   alert('Looks like you have not verified your email account, please check inbox and click on the link given');
      // }
    });
  }

  autoPopulateInfoForm(userInfo: IUserDetails) {

    console.log('userInfo is -- ', userInfo);
    this.updateUserForm.controls.address.patchValue(userInfo.address);
    this.updateUserForm.controls.emailID.patchValue(userInfo.emailID);
    this.updateUserForm.controls.firstName.patchValue(userInfo.firstName);
    this.updateUserForm.controls.lastName.patchValue(userInfo.lastName);
    this.updateUserForm.controls.lastDonated.patchValue(userInfo.lastDonated);
    this.updateUserForm.controls.mobileNumber.patchValue(userInfo.mobileNumber);
    this.updateUserForm.controls.password.patchValue(userInfo.password);
    this.updateUserForm.controls.username.patchValue(userInfo.username);

  }

  onClickCancel() {
    this.router.navigateByUrl('');
  }

  onClickUpdate() {
    this.updatedDetails.address = this.updateUserForm.controls.address.value;
//    this.updatedDetails.emailID = this.updateUserForm.controls.emailID.value;
    this.updatedDetails.firstName = this.updateUserForm.controls.firstName.value;
    this.updatedDetails.lastName = this.updateUserForm.controls.lastName.value;
    this.updatedDetails.lastDonated = this.updateUserForm.controls.lastDonated.value;
    this.updatedDetails.mobileNumber = this.updateUserForm.controls.mobileNumber.value;
 //   this.updatedDetails.password = this.updateUserForm.controls.password.value;
    this.updatedDetails.username = this.updateUserForm.controls.username.value;
    this.signInService.updateUserInfo(this.updatedDetails).subscribe((data) => {

      console.log('data in sign in component -- ', data);
    });
  }
}
