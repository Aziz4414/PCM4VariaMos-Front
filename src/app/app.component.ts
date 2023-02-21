import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CatalogueService} from "./catalogue.service";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  public categories: any;
  public currentCategorie: any ;

  constructor( private catService : CatalogueService,
               private router: Router) {
  }
  ngOnInit(): void {
    this.getCategories();
  }
  private getCategories() {
    this.catService.getRessource('/categories')
      .subscribe( data => {
        this.categories = data;
      },err =>{
        console.log(err);
      })
  }

  getProductsByCat({c}: { c: any }) {
    this.currentCategorie = c ;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl('/products/1/0');
  }

  onProductsDispo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/3/0")
  }

  onProductsPromo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/4/0")
  }

  onLogout() {
    this.router.navigateByUrl("/login");
  }
}
