export interface CustomerDataI {
    name: string;
    phone: any;
}
 
export interface  CartOrderI {
    
}
export class CustomerData implements CustomerDataI {
    name: string;
    phone: any;
  }