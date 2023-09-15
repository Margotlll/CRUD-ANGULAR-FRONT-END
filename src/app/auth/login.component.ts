import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUserDto } from '../model/login-user-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username!:string;
  password!:string;
  constructor(
    private authService :AuthService,
    private tokenService :TokenService,
    private toast :ToastrService,
    private router : Router,

  ){}
  ngOnInit():void{

  }
  onLogin():void{
    const dto=new LoginUserDto(this.username,this.password);
    this.authService.login(dto).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/home']);
        //console.log(data.token);
      },
      err =>{
        this.toast.error(err.error.message,'error',{timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['']);

      }
    );
  }


}
