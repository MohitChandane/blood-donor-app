import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public showRegisterForm: boolean;
  public hideLandingButtons: boolean;
  public detailsForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit() {  }

  onClickRegisterMe() {
    this.router.navigateByUrl('/register');
  }
  // onClickCancel() {
  //   this.hideLandingButtons = false;
  //   this.showRegisterForm = !this.showRegisterForm;
  // }

  onClickSignIn() {
    this.router.navigateByUrl('/signIn');

  }

  onClickBloodRequest() {
    this.router.navigateByUrl('/bloodrequest');
  }
}
