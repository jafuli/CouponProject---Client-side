import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { Coupon } from 'src/app/models/coupon';
import { Category } from 'src/app/models/category.enum';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  searchFormCoupon: FormGroup;
  filteredCoupons: Coupon[];
  customer: Customer;
  myCoupons: Coupon[];
  searchMsg: string;
  categories = Category;
  keys = Object.keys(this.categories);
  showCoupons: boolean = true;
  showSearchResult: boolean = false;

  constructor(private router: Router, private customerService: CustomerServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerService.getCustomerDetails().subscribe(cust => {
      this.customer = cust;
      // console.log(this.customer)
    }, err => {
      console.log(err.error);
    });

    this.customerService.getCustomerCoupons().subscribe(coupons => {
      this.myCoupons = coupons;
    }, err => {
      console.log(err.error);
    });

    this.searchFormCoupon = this.fb.group({
      param: ['', Validators.required],
      searchBy: ['category', Validators.required]
    });
  }

  back() {
    this.router.navigate(['customerHome']);
  }

  clearField(formDirective: FormGroupDirective) {
    this.searchFormCoupon.controls['param'].setValue('');
    formDirective.resetForm();
    this.searchFormCoupon.reset();
    this.searchFormCoupon.controls['searchBy'].setValue('maxPrice');
    this.searchMsg = '';
    this.showSearchResult = false;
    this.showCoupons = true;
  }

  search() {
    var sf = this.searchFormCoupon.controls;
    if (sf['searchBy'].value == '') {
      this.showSearchResult = false;
      this.searchMsg = '';
      return;
    }

    switch (sf['searchBy'].value) {
      case 'category':
        this.filteredCoupons = this.myCoupons.filter(({ category }) => category == sf['param'].value);
        break;
      case 'maxPrice':
        var price1 = parseFloat(sf['param'].value);
        this.filteredCoupons = this.myCoupons.filter(({ price }) => price <= price1);
        break;
    }

    if (this.filteredCoupons.length == 0) {
      this.showSearchResult = false;
      this.showCoupons = false;
      this.searchMsg = ' No coupons found';
    } else {
      this.showSearchResult = true;
      this.showCoupons = true;
      this.searchMsg = '';
    }

  }

}
