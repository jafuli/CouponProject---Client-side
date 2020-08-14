import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {

  constructor(private client: HttpClient) { }

  addCoupon(coupon: Coupon) {
    return this.client.post("http://localhost:8080/company/addCoup/" + sessionStorage.getItem('userId'), coupon, { responseType: 'text' });
  }

  updateCoupon(coupon: Coupon) {
    return this.client.put("http://localhost:8080/company/updateCoup/" + sessionStorage.getItem('userId'), coupon, { responseType: 'text' });
  }

  deleteCoupon(id: number) {
    return this.client.delete("http://localhost:8080/company/delCoup/" + sessionStorage.getItem('userId') + "/" + id, { responseType: 'text' });
  }

  getAllCoupons() {
    return this.client.get<Coupon[]>("http://localhost:8080/company/getAllCoup/" + sessionStorage.getItem('userId'));
  }

  // getCouponsByCategory(category: string) {
  //   return this.client.get<Coupon[]>("http://localhost:8080/company/getCoupCategory/" + sessionStorage.getItem('userId') + "/" + category);
  // }

  // getCouponsByMaxPrice(price: number) {
  //   return this.client.get<Coupon[]>("http://localhost:8080/company/getCoupPrice/" + sessionStorage.getItem('userId') + "/" + price);
  // }

  getCompanyDetails() {
    return this.client.get<Company>("http://localhost:8080/company/detes/" + sessionStorage.getItem('userId'));
  }


}
