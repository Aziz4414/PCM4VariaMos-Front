import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import * as events from "events";
import {empty} from "rxjs";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;
  public EditPhoto: boolean = true;
  public currentProduct: any;
  private selectedFiles: any = empty();
  public progress: number = 0;
  private currentFileUpload: any;
  private currentTime: number=0;
  private timestamp: number = 0;

  constructor(public catService: CatalogueService,
              private route: ActivatedRoute,
              private router: Router,
              public  autService : AuthentificationService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        // console.log(this.route.snapshot.params["id"]);
        let p1 = this.route.snapshot.params["p1"];
        if (p1 == 1) {
          this.getProducts('/products/search/selectedProducts');
        }
        else if (p1 == 2) {
          let idCat = this.route.snapshot.params["p2"];
          this.getProducts('/categories/' + idCat + '/products');
        }
        else if (p1 == 3) {
          let idCat = this.route.snapshot.params["p2"];
          this.getProducts('/products/search/promoProducts');
        }
        else if (p1 == 4) {
          let idCat = this.route.snapshot.params["p2"];
          this.getProducts('/products/search/dispoProducts');
        }
        else if (p1 == 5) {
          let idCat = this.route.snapshot.params["p2"];
          this.getProducts('/products/search/dispoProducts');
        }
      }})
  }



  private getProducts(url: any) {
    this.catService.getRessource(url).subscribe(
      data => {
        console.log('getProducts at ' + url)
        this.products = data;
      }, err => {
        console.log(err);
      })
  }

  //onEditPhoto(p) {
  //this.currentProduct = p;
  //}
  onEditPhoto(p : any) {
    this.currentProduct = p;
    this.EditPhoto = true;
  }

  onSelectedFile({event}: { event: any }) {
    this.selectedFiles = event.target.files;
    // let file = ($event.target as HTMLInputElement).files;
    //const fileZ = $event?.target?.file;
    //this.selectedFiles = fileZ;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        event.total=0.00001;
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.timestamp =Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })
    this.selectedFiles = undefined
  }

  getTS(){
    return this.timestamp;
  }

}
