import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustForm: FormGroup;

  constructor(private snackbar: MatSnackBar, private router: Router, private fb: FormBuilder, private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.addCustForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  add(formDirective: FormGroupDirective) {
    if (this.addCustForm.invalid)
      return;

    const newCustomer: Customer = new Customer(0,
      this.addCustForm.controls['fname'].value,
      this.addCustForm.controls['lname'].value,
      this.addCustForm.controls['email'].value,
      this.addCustForm.controls['password'].value, null);

    this.adminService.addCustomer(newCustomer).subscribe((msg) => {
      formDirective.resetForm();
      this.addCustForm.reset();
      // console.log(msg);
      this.snackbar.open(msg, "Close", {duration: 2000});
    }, (err) => {
      console.log(err.error);
      this.snackbar.open(err.error, "Close", {duration: 2000});
    });
  }

  back() {
    this.router.navigate(['adminHome', {tabSelect:1}]);
  }

}
