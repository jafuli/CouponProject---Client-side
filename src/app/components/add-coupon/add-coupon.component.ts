import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Router } from '@angular/router';
import { CompanyServiceService } from 'src/app/services/company-service.service';
import { Coupon } from 'src/app/models/coupon';
import { Category } from 'src/app/models/category.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  categories = Category;
  keys = Object.keys(this.categories);
  minDate: Date;
  addCouponForm: FormGroup;
  company: Company;

  constructor(private snackbar: MatSnackBar, private router: Router, private fb: FormBuilder, private companyService: CompanyServiceService) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.addCouponForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      sDate: ['', Validators.required],
      eDate: ['', Validators.required]
    });


    this.companyService.getCompanyDetails().subscribe((comp) => {
      this.company = comp;
      // console.log(this.company.name);
    }, err => {
      console.log(err.error);
    });
  }

  add(formDirective: FormGroupDirective) {
    if (this.addCouponForm.invalid)
      return;

    var uf = this.addCouponForm.controls;
    const newCoupon: Coupon = new Coupon(0, this.company, uf['category'].value,
      uf['title'].value, uf['description'].value, uf['sDate'].value,
      uf['eDate'].value, uf['amount'].value, uf['price'].value, '');

    this.companyService.addCoupon(newCoupon).subscribe(msg => {
      formDirective.resetForm();
      this.addCouponForm.reset();
      // console.log(msg)
      this.snackbar.open(msg, "Close", { duration: 2000 });
    }, err => {
      console.log(err.error);
      this.snackbar.open(err.error, "Close", { duration: 2000 });
    });
  }

  back() {
    this.router.navigate(['companyHome']);
  }

}
