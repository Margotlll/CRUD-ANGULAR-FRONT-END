import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(
    private tokenService: TokenService,
    private router: Router

    ){}
  ngOnInit(): void {

  }
  logOut():void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

}
