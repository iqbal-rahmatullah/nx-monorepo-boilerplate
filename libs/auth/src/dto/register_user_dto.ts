export class RegisterUserDTO {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  address: string;
  hashedPassword?: string;

  constructor({ email, fullName, password, confirmPassword, address }) {
    this.email = email;
    this.fullName = fullName;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.address = address;
  }
}
