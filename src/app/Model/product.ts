import { Byte } from "@angular/compiler/src/util";

export class Product {
    id: number;
    Pname: string;
    price: number;
    stock: number;
    supid: number;
    image: string;
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