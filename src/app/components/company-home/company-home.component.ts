import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CompanyServiceService } from 'src/app/services/company-service.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.enum';
import { Company } from 'src/app/models/company';


@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  searchFormCoupon: FormGroup;
  allCoupons: Coupon[];
  filteredCoupons: Coupon[];
  searchMsg: string;
  categories = Category;
  keys = Object.keys(this.categories);
  showCoupons: boolean = true;
  showSearchResult: boolean = false;
  company: Company;

  constructor(private router: Router, private fb: FormBuilder, private companyService: CompanyServiceService) { }

  ngOnInit(): void {
    this.companyService.getCompanyDetails().subscribe(comp=>{
      this.company = comp;
    });
    this.companyService.getAllCoupons().subscribe(coupons => {
      this.allCoupons = coupons;
    });

    this.searchFormCoupon = this.fb.group({
      param: ['', Validators.required],
      searchBy: ['category', Validators.required]
    });
  }

  spliceCoupon(c: Coupon) {
    this.allCoupons.splice(this.allCoupons.indexOf(c), 1);
  }

  toAddCoupon() {
    this.router.navigate(['addCoupon']);
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
        this.filteredCoupons = this.allCoupons.filter(({ category }) => category == sf['param'].value);
        break;
      case 'maxPrice':
        var price1 = parseFloat(sf['param'].value);
        this.filteredCoupons = this.allCoupons.filter(({ price }) => price <= price1);
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
