import { Component, OnInit } from '@angular/core';
import { RegisterUserService } from '../register-user.service';
import { IUserDetails, ICoordinates } from '../UserDetails';
import { Router } from '@angular/router';

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
  constructor( private registerUserSer: RegisterUserService, private router: Router) { }

  public donorsData;

  ngOnInit() {
    this.donorsData = [];
    this.filteredUsers = [];
    this.getAllUser();
    // this.calculateDistance();
    this.filterNearByDonors();
  }

  getAllUser() {
    this.registerUserSer.getUserDetails().subscribe((allUserData) => {
      if (allUserData.length) {
          this.donorsData = allUserData;
     //     console.log('this.donorsData -- ', this.donorsData);
     //     this.donorsData.map(() => {})
          if (navigator)
          {
          navigator.geolocation.getCurrentPosition( pos => {
              this.reqLatitude = +pos.coords.latitude;
              this.resLongitude = +pos.coords.longitude;
              this.donorsData.forEach((data) => {
                const coordinates = {
                  reqLat:  this.reqLatitude,
                  reqLon: this.resLongitude,
                  donLat: data.latitude,
                  donLon: data.longitude
                };
                console.log('coordinates -- ', coordinates);
                if (this.calculateDistance(coordinates) < 15) {
                   this.filteredUsers.push(data);
                }
              });
            });
          console.log('final list of donors -- ', this.filteredUsers);
          }
      }
    });
  }
  calculateDistance(data: ICoordinates): number {
    const donorlat = data.donLat;
    const donorlon = data.donLon;
    const requester = new google.maps.LatLng(data.reqLat, data.reqLon);
    console.log('requester -- ', requester);
    const donor = new google.maps.LatLng(donorlat, donorlon);
    console.log('donor -- ', donor);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(requester, donor) / 1000;
    console.log('final distance is  -- ', distance);
    return distance;
  }
  onClickCancel() {
    this.router.navigateByUrl('');
  }

  filterNearByDonors() {
      // const a = new google.maps.LatLng(18.5477155, 73.9183243); // (lat, lng)
      // const b = new google.maps.LatLng(18.5106432, 73.83613439999999);
      // const distance = google.maps.geometry.spherical.computeDistanceBetween(a, b);
      // console.log('a -- ', a);
      // console.log('b -- ', b);
      // console.log('distance from station to aga khan museum is adasd -- ', distance);

  }
  }
