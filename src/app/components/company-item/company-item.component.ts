import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/models/company';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateCompanyDialogComponent } from '../update-company-dialog/update-company-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css']
})
export class CompanyItemComponent implements OnInit {

  @Input()
  company: Company;
  @Output() newItemEvent = new EventEmitter<Company>();

  errMsg: string;

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private adminService: AdminServiceService) { }

  ngOnInit(): void {
  }

  // "are you sure?" alert
  openConfirmationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this company?";

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteCompany();
    });
  }

  deleteCompany() {
    this.adminService.deleteCompany(this.company.id).subscribe((msg) => {
      console.log(msg);
      this.newItemEvent.emit(this.company);
    }, (err) => {
      console.log(err.error);
      this.errMsg = err.error;
    });
  }

  getCompany() {
    this.adminService.getOneCompany(this.company.id).subscribe(comp => {
      this.company = comp;
    }, err => {
      console.log(err.error);
      this.errMsg = err.error;
    });
  }

  updateCompany() {
    this.adminService.updateCompany(this.company).subscribe((msg) => {
      console.log(msg);
      this.snackbar.open(msg, "Close", {duration: 2000});
    }, (err) => {
      console.log(err.error);
      this.errMsg = err.error;
      this.snackbar.open(err.error, "Close", {duration: 2000});
      // display correct details if update fails
      this.getCompany();
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      email: this.company.email,
      password: this.company.password
    };

    const dialogRef = this.dialog.open(UpdateCompanyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data == undefined)
        return;

      this.company.email = data.email;
      this.company.password = data.password;
      this.updateCompany();
    });


  }




}
