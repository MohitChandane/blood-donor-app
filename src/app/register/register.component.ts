import { RegisterUserService } from './../register-user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hideRegisterPage: boolean;
  public name: string;
  public detailsForm: FormGroup;
  constructor(private router: Router, private registerUserSer: RegisterUserService) { }

  ngOnInit() {
    this.initForm();
  }
  onClickCancel() {
    this.router.navigateByUrl('');
    this.hideRegisterPage = true;
  }
  initForm() {
    this.detailsForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      mobileNumber: new FormControl(''),
      address: new FormControl(''),
      emailID: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
   });
  }

  onClickSubmit() {
    this.name = this.detailsForm.controls.firstName.value;
    this.registerUserSer.getAllUsers().subscribe(data => {
      console.log('data respose', data);
    });

    // this.registerUserSer.postUser({name: 'user1'}).subscribe(data => {
    //   console.log('post data ', data);
    // });
  }
}
