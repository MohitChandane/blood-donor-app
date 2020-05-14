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
}

export interface IUserSignIn {
    username?: string;
    password?: string;
}
