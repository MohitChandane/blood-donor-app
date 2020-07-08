import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../register-user.service';
import { IUserDetails, ICoordinates } from '../UserDetails';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blood-requester',
  templateUrl: './blood-requester.component.html',
  styleUrls: ['./blood-requester.component.css']
})
export class BloodRequesterComponent implements OnInit {

  public reqLatitude;
  public resLongitude;
  public filteredUsers: IUserDetails[];
  showUsersTable: boolean;
  public latitude: 18.5477155;
  public longitude: 73.9183243;
  public requesterForm: FormGroup;
  showResultTable: boolean;
  showZipcodeError: boolean;
  showNoDataErr: boolean;
  isSubmitted: boolean;
  constructor(private registerUserSer: RegisterUserService, private router: Router, private fb: FormBuilder) { }

  public donorsData;

  ngOnInit() {
    console.log("component called");
    this.requesterForm = this.fb.group({
      zipcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      distance: ['', Validators.required]
    });
   // this.sendRequesterData();
    this.initLocation();
    this.donorsData = [];
    this.filteredUsers = [];
    this.getAllUser();
    // this.calculateDistance();
  }

  getAllUser() {

    const options1 = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  }
  calculateDistance(data: ICoordinates): number {
    const donorlat = data.donLat;
    const donorlon = data.donLon;
    const requester = new google.maps.LatLng(data.reqLat, data.reqLon);
    const donor = new google.maps.LatLng(donorlat, donorlon);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(requester, donor) / 1000;
    return distance;
  }
  onClickCancel() {
    this.router.navigateByUrl('');
  }

  initLocation() {
    const address = 'vadgaonsheri, pune, maharashtra';
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (result, status) => {
     // console.log('locations detected is ', status);
      if (status === 'OK') {
    //    console.log('locations detected is ', result);
      } else {
        // alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  sendRequesterData() {
    this.isSubmitted = true;
    if (this.requesterForm.valid) {
      this.registerUserSer.postRequesterData({zipcode: this.requesterForm.controls.zipcode.value}).subscribe((reqLocation) => {
     //   console.log('data in send request data is -- ', reqLocation);
        this.registerUserSer.getUserDetails().subscribe((allUserData) => {
          if (allUserData.length) {
            this.donorsData = allUserData;
            //     console.log('this.donorsData -- ', this.donorsData);
            //     this.donorsData.map(() => {})
            //   if (navigator) {
            //    navigator.geolocation.getCurrentPosition((pos) => {
            this.reqLatitude = reqLocation.location.lat;
            this.resLongitude = reqLocation.location.long;
       //     console.log('requester locations ' + this.reqLatitude + ' --- ' + this.resLongitude);
            this.donorsData.forEach((data) => {
              if (data) {
                const coordinates = {
                  reqLat: this.reqLatitude,
                  reqLon: this.resLongitude,
                  donLat: data.latitude,
                  donLon: data.longitude
                };
                if (this.calculateDistance(coordinates) < this.requesterForm.controls.distance.value) {
                  this.filteredUsers.push(data);
                  this.showResultTable = true;
                  this.showZipcodeError = false;
                }
              }
            });
            if (this.filteredUsers.length === 0) {
              this.showNoDataErr = true;
            } else {
              this.showNoDataErr = false;
            }
       //     console.log('this.filteredUsers length' , this.filteredUsers.length);
            //     });
            console.log('final list of donors -- ', this.filteredUsers);
            //     }
          }
        });
      },
      (error) => {
     //   console.log('invalid zipcode');
        this.showZipcodeError = true;
      });
    }
  }
}
