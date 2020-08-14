import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private client: HttpClient) { }

  purchaseCoupon(coupon: Coupon) {
    return this.client.post("http://localhost:8080/customer/purchase/" + sessionStorage.getItem('userId'), coupon, { responseType: 'text' });
  }

  getCustomerCoupons() {
    return this.client.get<Coupon[]>("http://localhost:8080/customer/getCustCoup/" + sessionStorage.getItem('userId'));
  }

  // getCouponsByCategory(category: string) {
  //   return this.client.get<Coupon[]>("http://localhost:8080/customer/getCoupCategory/" + sessionStorage.getItem('userId') + "/" + category);
  // }

  // getCouponsByMaxPrice(price: number) {
  //   return this.client.get<Coupon[]>("http://localhost:8080/customer/getCoupPrice/" + sessionStorage.getItem('userId') + "/" + price);
  // }

  getCustomerDetails() {
    return this.client.get<Customer>("http://localhost:8080/customer/detes/" + sessionStorage.getItem('userId'));
  }

  getAllCoupons() {
    return this.client.get<Coupon[]>("http://localhost:8080/customer/getAllCoup/" + sessionStorage.getItem('userId'));
  }

}
