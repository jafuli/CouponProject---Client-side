import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-company-dialog',
  templateUrl: './update-company-dialog.component.html',
  styleUrls: ['./update-company-dialog.component.css']
})
export class UpdateCompanyDialogComponent implements OnInit {

  email: string;
  password: string;
  updateForm: FormGroup;
  errMsg: string;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.email = data.email;
    this.password = data.password;
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, Validators.required],
      password2: [this.password, Validators.required]
    });
  }

  back() {
    this.dialogRef.close();
  }

  send() {
    this.dialogRef.close({
      email: this.updateForm.controls['email'].value,
      password: this.updateForm.controls['password'].value
    });
  }

}
