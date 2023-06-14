import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: Product |undefined;
  //id !: number;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void{
    //this.id = this.activatedRoute.snapshot.params['id'];
    const id=this.activatedRoute.snapshot.params['id'];
    this.productService.detail(id).subscribe(
      data => {

        this.product=data;
        console.log(this.product);

    },
    err => {
      this.toast.error(err.error.message,'error',{timeOut: 3000, positionClass: 'toast-top-center'});
      this.router.navigate(['']);

    });
  }

}
