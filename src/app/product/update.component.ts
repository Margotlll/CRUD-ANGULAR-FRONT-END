import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { Product } from '../model/product';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  //id! : number;
  //name! :string;
  //price!:number;

  product!: Product;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    //private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ){}

  ngOnInit(): void {
    this.getProduct();

  }

  onUpdate(): void{
   // const product= new Product(this.id,this.price)
    this.productService.update(this.product.id,this.product).subscribe(
      data => {
        this.toast.success(data.message,'OK',{timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['']);

    },
    err => {
      this.toast.error(err.error.message,'error',{timeOut: 3000, positionClass: 'toast-top-center'});


    });
  }

  getProduct(): void{
    this.product =this.storageService.getProduct();
    this.storageService.clear();
  }


}
