import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  msg: string;

  constructor(private logoutService: LogoutService, private router: Router, private fb: FormBuilder, private ls: LoginServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      clientType: ['', Validators.required]
    });
  }

  submit() {
    this.ls.login(this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value,
      this.loginForm.controls['clientType'].value)
      .subscribe((token) => {
        sessionStorage.setItem('userId', token);
        this.logoutService.setLoginStatus(1);
        switch (this.loginForm.controls['clientType'].value) {
          case "Administrator":
            sessionStorage.setItem('userRole', 'admin');
            this.logoutService.setRole(1);
            this.router.navigate(['adminHome']);
            break;
          case "Company":
            sessionStorage.setItem('userRole', 'company');
            this.logoutService.setRole(2);
            this.router.navigate(['companyHome']);
            break;
          case "Customer":
            sessionStorage.setItem('userRole', 'customer');
            this.logoutService.setRole(3);
            this.router.navigate(['customerHome']);
            break;
        }
      }, (err) => {
        console.log(err.error);
        this.msg = "login unsuccesful, " + err.error;
      });
  }

}
