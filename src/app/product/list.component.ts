import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

//Implementar OnInit
export class ListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.list().subscribe(data => {

      this.products = data;
      // console.log(this.products);

    },
      err => {
        this.toast.error(err.error.message, 'error', { timeOut: 3000, positionClass: 'toast-top-center' });

      });
  }
  onDelete(id: number): void {
    Swal.fire({
      title: 'Estás seguro de eliminar este registro?',
      text: 'No podras desacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        console.log('Deleted' + id);
        this.productService.delete(id).subscribe(data => {
          this.toast.success(data.message, 'OK', { timeOut: 3000, positionClass: 'toast-top-center' });
          this.getProducts();

        },
          err => {
            this.toast.error(err.error.message, 'error', { timeOut: 3000, positionClass: 'toast-top-center' });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('canceled', 'product not deleted', 'error')

      }
    })

  }

}
