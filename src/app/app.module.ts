import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './Ecom/homepage/homepage.component';
import { CartComponent } from './Ecom/cart/cart.component';
import { LoginComponent } from './Ecom/login/login.component';
import { TopbarComponent } from './Ecom/topbar/topbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BottombarComponent } from './bottombar/bottombar.component';
import { ProductItemComponent } from './Ecom/product/product-item/product-item.component';
import { ProductComponent } from './Ecom/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSliderModule } from '@angular/material/slider';
import { ProductDetailsComponent } from './Ecom/product-details/product-details.component';
import { CategoryComponent } from './Ecom/category/category.component';
import { ChekoutComponent } from './Ecom/chekout/chekout.component';
import { RegisterComponent } from './Ecom/register/register.component';
import { AddressComponent } from './Ecom/address/address.component';
import { OrdersComponent } from './Ecom/orders/orders.component';
import { OrderitemsComponent } from './Ecom/orders/orderitems/orderitems.component';
import { BillComponent } from './Ecom/orders/bill/bill.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MobSerchComponent } from './Ecom/mob-serch/mob-serch.component';




@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CartComponent,
    LoginComponent,
    TopbarComponent,
    BottombarComponent,
    ProductItemComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoryComponent,
    ChekoutComponent,
    RegisterComponent,
    AddressComponent,
    OrdersComponent,
    OrderitemsComponent,
    BillComponent,
    MobSerchComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSliderModule,
    MatDialogModule,
    MatExpansionModule,
    BrowserAnimationsModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
