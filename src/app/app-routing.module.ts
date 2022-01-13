import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Ecom/cart/cart.component';
import { HomepageComponent } from './Ecom/homepage/homepage.component';
import { LoginComponent } from './Ecom/login/login.component';
import { ProductComponent } from './Ecom/product/product.component';
import { ProductDetailsComponent } from './Ecom/product-details/product-details.component';
import { CategoryComponent } from './Ecom/category/category.component';
import { ChekoutComponent } from './Ecom/chekout/chekout.component';
import { RegisterComponent } from './Ecom/register/register.component';
import { OrdersComponent } from './Ecom/orders/orders.component';
import { BillComponent } from './Ecom/orders/bill/bill.component';
import { MobSerchComponent } from './Ecom/mob-serch/mob-serch.component';
import { OrderitemsComponent } from './Ecom/orders/orderitems/orderitems.component';

const routes: Routes = [
      {path : '', component: HomepageComponent},
      {path : "bag", component: CartComponent},
      {path : "bag/chekout", component:ChekoutComponent},
      {path : "$/:token",component:RegisterComponent},
      {path : "shoping/:item", component:ProductComponent},  
      {path : "shop/product/:item", component:ProductDetailsComponent},
      {path : "ShopBy/:category", component: CategoryComponent},
      {path : "myorders", component : OrdersComponent},
      {path : "order-details/:inv", component : OrderitemsComponent},
      {path : "loginUser", component: LoginComponent},
      {path : "order/summary/:inv", component : BillComponent},
      {path : "search" , component : MobSerchComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
