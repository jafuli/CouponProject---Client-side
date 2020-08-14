import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UpdateCustomerDialogComponent } from '../update-customer-dialog/update-customer-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.css']
})
export class CustomerItemComponent implements OnInit {

  @Input()
  customer: Customer;
  @Output() newItemEvent = new EventEmitter<Customer>();
  editMode: boolean = false;
  errMsg: string;

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private adminService: AdminServiceService) { }

  ngOnInit(): void {
  }

  // are you sure? alert
  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this customer?";

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteCustomer();
    });
  }

  deleteCustomer() {
    this.adminService.deleteCustomer(this.customer.id).subscribe((msg) => {
      console.log(msg);
      this.newItemEvent.emit(this.customer);
    }, (err) => {
      console.log(err.error);
      this.errMsg = err.error;
    })
  }

  getCustomer() {
    this.adminService.getOneCustomer(this.customer.id).subscribe(cust => {
      this.customer = cust;
    }, err => {
      console.log(err.error);
      this.errMsg = err.error;
    });
  }

  updateCustomer() {
    this.adminService.updateCustomer(this.customer).subscribe((msg) => {
      console.log(msg);
      this.snackbar.open(msg, "Close", { duration: 2000 });
    }, (err) => {
      console.log(err.error);
      this.errMsg = err.error;
      this.snackbar.open(err.error, "Close", { duration: 2000 });
      // display correct details if update fails
      this.getCustomer();
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      fname: this.customer.firstName,
      lname: this.customer.lastName,
      email: this.customer.email,
      password: this.customer.password
    };

    const dialogRef = this.dialog.open(UpdateCustomerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == undefined)
        return;

      this.customer.firstName = data.fname;
      this.customer.lastName = data.lname;
      this.customer.email = data.email;
      this.customer.password = data.password;
      this.updateCustomer();
    });

  }


}
