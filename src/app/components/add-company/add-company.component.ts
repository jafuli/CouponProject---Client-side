import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  addCompForm: FormGroup;

  constructor(private snackbar: MatSnackBar, private router: Router, private fb: FormBuilder, private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.addCompForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  add(formDirective: FormGroupDirective) {
    if (this.addCompForm.invalid)
      return;

    const newCompany: Company = new Company(0,
      this.addCompForm.controls['name'].value,
      this.addCompForm.controls['email'].value,
      this.addCompForm.controls['password'].value, null);

    this.adminService.addCompany(newCompany).subscribe((msg) => {
      formDirective.resetForm();
      this.addCompForm.reset();
      console.log(msg);
      this.snackbar.open(msg, "Close", { duration: 2000 });
    }, (err) => {
      console.log(err.error);
      this.snackbar.open(err.error, "Close", { duration: 2000 });
    });
  }

  back() {
    this.router.navigate(['adminHome']);
  }

}
