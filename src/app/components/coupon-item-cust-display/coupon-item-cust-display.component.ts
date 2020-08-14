import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { CustomerServiceService } from 'src/app/services/customer-service.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { style } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coupon-item-cust-display',
  templateUrl: './coupon-item-cust-display.component.html',
  styleUrls: ['./coupon-item-cust-display.component.css']
})
export class CouponItemCustDisplayComponent implements OnInit {

  @Input()
  coupon: Coupon;

  errMsg: string;
  myCoupons: Coupon[];
  purchased: boolean;
  showDefaultImg: boolean;

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private customerService: CustomerServiceService) { }

  ngOnInit(): void {
    // mark as ran out
    if (this.coupon.amount == 0) {
      this.errMsg = "Coupon ran out!";
    }

    if (this.coupon.image == '') {
      this.showDefaultImg = true;
    }

    this.customerService.getCustomerCoupons().subscribe(coupons => {
      this.myCoupons = coupons;
      const e = (this.myCoupons.find(({ id }) => id === this.coupon.id));
      if (e != undefined)
        this.purchased = true;
      else
        this.purchased = false;
      // console.log(this.purchased)
    }, err => {
      console.log(err.error);
    });
  }

  purchaseCoupon() {
    this.customerService.purchaseCoupon(this.coupon).subscribe((msg) => {
      console.log(msg);
      this.snackbar.open(msg, "Close", { duration: 2000 });
      this.purchased = true;
    }, (err) => {
      this.errMsg = err.error;
      console.log(err.error);
      this.snackbar.open(err.error, "Close", { duration: 2000 });
    });
  }

  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.componentInstance.confirmMessage = "Are you sure you want to purchase this coupon?";

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.purchaseCoupon();
    });
  }

}
