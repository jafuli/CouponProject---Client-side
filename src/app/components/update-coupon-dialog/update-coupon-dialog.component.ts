import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-update-coupon-dialog',
  templateUrl: './update-coupon-dialog.component.html',
  styleUrls: ['./update-coupon-dialog.component.css']
})
export class UpdateCouponDialogComponent implements OnInit {

  minDate: Date;
  coupon: Coupon;
  updateForm: FormGroup;
  errMsg: string;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateCouponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.coupon = data.coupon;
    if (this.coupon.startDate > new Date()) {
      this.minDate = new Date();
    } else {
      this.minDate = new Date(this.coupon.startDate);
    }
  }

  ngOnInit(): void {
    console.log(this.coupon)
    this.updateForm = this.fb.group({
      amount: [this.coupon.amount, [Validators.required, Validators.min(0)]],
      price: [this.coupon.price, [Validators.required, Validators.min(0)]],
      // image: ['',],
      description: [this.coupon.description, Validators.required],
      sDate: [this.coupon.startDate, Validators.required],
      eDate: [this.coupon.endDate, Validators.required]
    });
  }

  back() {
    this.dialogRef.close(); 
  }

  send() {
    let uf = this.updateForm.controls;
    this.coupon.amount = uf['amount'].value;
    this.coupon.description = uf['description'].value;
    this.coupon.price = uf['price'].value;
    // this.coupon.image = uf['image'].value;
    this.coupon.startDate = uf['sDate'].value;
    this.coupon.endDate = uf['eDate'].value;
    this.dialogRef.close(this.coupon);
  }

}
