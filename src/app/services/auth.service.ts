import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUserDto } from '../model/login-user-dto';
import { Observable } from 'rxjs';
import { JwtTokenUserDto } from '../model/jwt-token-user-dto';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../model/create-user-dto';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  authURL = environment.apiResrUrl +'/auth/';

  constructor(private Httpclient: HttpClient){ }
  public login(dto : LoginUserDto) : Observable<JwtTokenUserDto>{
    return this.Httpclient.post<JwtTokenUserDto>(this.authURL+ 'login' ,dto);
  }
  public register(dto : CreateUserDto) : Observable<any>{
    return this.Httpclient.post<any>(this.authURL+'create-user',dto);
  }
}
