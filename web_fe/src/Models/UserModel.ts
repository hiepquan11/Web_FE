class UserModel{
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    password: string;

    constructor(userId: number, fullName: string, phoneNumber: string, address: string, password: string, email: string){
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.password = password
    }
}

export default UserModel;