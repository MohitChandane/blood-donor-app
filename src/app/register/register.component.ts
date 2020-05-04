import { RegisterUserService } from './../register-user.service';
// tslint:disable-next-line: ordered-imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// tslint:disable-next-line: ordered-imports
import { FormGroup, FormControl } from '@angular/forms';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public hideRegisterPage: boolean;
  public name: string;
  public detailsForm: FormGroup;
  public userData: UserDetails;
  public DBdata;
  constructor(private router: Router, private registerUserSer: RegisterUserService) { }

  public ngOnInit() {
    this.initForm();
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
      lastName: new FormControl(''),
      mobileNumber: new FormControl(''),
      password: new FormControl(''),
      username: new FormControl(''),
    });
  }

  public onClickSubmit() {
    this.name = this.detailsForm.controls.firstName.value;
    // this.registerUserSer.getAllUsers().subscribe(data => {
    //   console.log('data respose', data);
    // });
    console.log('asdsadsdasdsadsad', this.name)
    // this.registerUserSer.saveUser(this.name)
    //   .subscribe(data => {
    //     console.log('sadsadsadsadsadsa', data);

    //     this.ngOnInit();
    //   }
    //     , error => error )

    // this.registerUserSer.postUser({name: 'user1'}).subscribe(data => {
    //   console.log('post data ', data);
    // });
    this.name = this.detailsForm.controls.firstName.value;
    console.log('usererrrrrrr', this.name);
    this.userData.firstName = this.detailsForm.controls.firstName.value;
    this.userData.lastName = this.detailsForm.controls.lastName.value;
    this.userData.mobileNumber = this.detailsForm.controls.mobileNumber.value;
    this.userData.address = this.detailsForm.controls.address.value;
    this.userData.emailID = this.detailsForm.controls.emailID.value;
    this.userData.username = this.detailsForm.controls.username.value;
    this.userData.password = this.detailsForm.controls.password.value;
    console.log('user data', this.userData);
  }
}
