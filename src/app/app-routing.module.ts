import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {HomeCatComponent} from "./home-cat/home-cat.component";
import {CreateProductComponent} from "./create-product/create-product.component";

const routes: Routes = [
  {path:'products/:p1/:p2', component : ProductsComponent},
  {path:'', component : HomeCatComponent},
  { path: 'add-emp', component: CreateProductComponent },
  {path:'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
