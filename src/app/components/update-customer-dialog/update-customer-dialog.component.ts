import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-customer-dialog',
  templateUrl: './update-customer-dialog.component.html',
  styleUrls: ['./update-customer-dialog.component.css']
})
export class UpdateCustomerDialogComponent implements OnInit {

  fname: string;
  lname: string;
  email: string;
  password: string;
  updateForm: FormGroup;
  errMsg: string;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.lname = data.lname;
    this.fname = data.fname;
    this.email = data.email;
    this.password = data.password;
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, Validators.required],
      password2: [this.password, Validators.required],
      fname: [this.fname, Validators.required],
      lname: [this.lname, Validators.required],
    });
  }

  back() {
    this.dialogRef.close();
  }

  send() {
    this.dialogRef.close({
      fname: this.updateForm.controls['fname'].value,
      lname: this.updateForm.controls['lname'].value,
      email: this.updateForm.controls['email'].value,
      password: this.updateForm.controls['password'].value
    });
  }

}
