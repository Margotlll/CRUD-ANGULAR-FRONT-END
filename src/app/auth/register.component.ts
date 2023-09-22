import { Component } from '@angular/core';
import { CreateUserDto } from '../model/create-user-dto';
import { ListComponent } from '../product/list.component';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  email!: string;
  password !:string;
  constructor(
    private authService :AuthService,
    private toast :ToastrService,
    private tokenService: TokenService,
    private router : Router,

  ){}


  ngOnInit():void{

  }
  onRegister():void{
    const dto=new CreateUserDto(
      this.username,
      this.email,
      this.password);
    this.authService.register(dto).subscribe(
      data => {
        this.toast.success(data.message,'OK',{timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['/login']);
      },
      err =>{
        this.toast.error(err.error.message,'Error',{timeOut: 3000, positionClass: 'toast-top-center'});
        }
    );


  }

}
