export interface IUserDetails {
    firstName?: string;
    lastName?: string;
    mobileNumber?: string;
    address?: string;
    emailID?: string;
    username?: string;
    password?: string;
    lastDonated?: string;
    userUniqueID?: number;
    isVerified?: boolean;
    longitude?: string;
    latitude?: string;
    zipcode?: string;
    bloodgroup?: string;
}

export interface IUserSignIn {
    username?: string;
    password?: string;
}

export interface ICoordinates {
    reqLat: number;
    reqLon: number;
    donLat: number;
    donLon: number;
}

export interface IReqZipcode {
    zipcode: string;
}
// mock data

// public uData = [{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },
//   {
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   },{
//     firstName: 'mohit',
//     lastName: 'chandane',
//     mobileNumber: '1863182921',
//     emailID: 'emial.com',
//     address: 'asdsadsdsad'
//   }];
