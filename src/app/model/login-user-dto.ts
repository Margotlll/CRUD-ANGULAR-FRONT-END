export class LoginUserDto {
  username : string;
  password : string;
  constructor(userame : string,  password :string){
    this.username=userame;
    this.password=password;
  }
}
