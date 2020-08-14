import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyServiceService } from 'src/app/services/company-service.service';
import { Coupon } from 'src/app/models/coupon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateCouponDialogComponent } from '../update-coupon-dialog/update-coupon-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ImageUploadDialogComponent } from '../image-upload-dialog/image-upload-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coupon-item',
  templateUrl: './coupon-item.component.html',
  styleUrls: ['./coupon-item.component.css']
})
export class CouponItemComponent implements OnInit {

  @Input()
  coupon: Coupon;
  @Output() newItemEvent = new EventEmitter<Coupon>();

  showDefaultImg: boolean;
  errMsg: string

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private companyService: CompanyServiceService) { }

  ngOnInit(): void {
    console.log(this.coupon.image)
    if (this.coupon.image == '') {
      this.showDefaultImg = true;
    }
  }

  // 'are you sure?' alert
  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this coupon?";

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteCoupon();
    });
  }

  deleteCoupon() {
    this.companyService.deleteCoupon(this.coupon.id).subscribe((msg) => {
      console.log(msg);
      this.errMsg = "";
      this.newItemEvent.emit(this.coupon);
    }, (err) => {
      console.log(err.error);
      this.snackbar.open(err.error, "Close", { duration: 2000 });
    });
  }

  updateCoupon() {
    this.companyService.updateCoupon(this.coupon).subscribe(msg => {
      console.log(msg);
      this.errMsg = '';
      this.snackbar.open(msg, "Close", { duration: 2000 });
    }, err => {
      console.log(err.error);
      this.snackbar.open(err.error, "Close", { duration: 2000 });
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      coupon: this.coupon
    };

    const dialogRef = this.dialog.open(UpdateCouponDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == undefined)
        return;

      this.coupon = data;
      this.updateCoupon();
    });

  }

  editImg() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    dialogConfig.data = {
      img: this.coupon.image
    };

    const dialogRef = this.dialog.open(ImageUploadDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == undefined) // back
        return;
      if (data.url == '') { // blank edit image click - restore to default image 
        this.showDefaultImg = true; 
        return;
      }

      this.coupon.image = data.url; // edit image to url
      this.updateCoupon();
      this.showDefaultImg = false;
    });
  }

}
