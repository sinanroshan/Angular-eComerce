import { Byte } from "@angular/compiler/src/util";

export class Product {
    productId:number;
    pname:string;
    discription:string
    image1:string
    image2:string
    image3:string
    image4:string
    pcategory:string
    mrp:number
    keyImage:string
    price:number
    supplierId:string
}
export interface Company{
    name:string
    phone:number
    email:string
    website:string
    gstNo:string
    state:string
    country:string
    bank:string
    bankBranch:string
    bankIfce:string
    bankAccNO:string
    address1:string
    city:string
    addres2:string
    pin:number
    logo:string
    }