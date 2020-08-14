import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public logoutService: LogoutService, private loginService: LoginServiceService, private router: Router) { }

  LoggedIn: boolean;


  ngOnInit(): void {
    if (sessionStorage.getItem('userId') != undefined && sessionStorage.getItem('userId').length > 1)
      this.logoutService.setLoginStatus(1);
    else
      this.logoutService.setLoginStatus(0);
  }

  logout() {
    this.loginService.logout(sessionStorage.getItem('userId')).subscribe(msg => {
      console.log(msg);
    });
    this.logoutService.setLoginStatus(0);
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userId');
    this.router.navigate(['main']);
  }

  toMain() {
    switch (sessionStorage.getItem('userRole')) {
      case 'admin':
        this.router.navigate(['adminHome']);
        break;
      case 'company':
        this.router.navigate(['companyHome']);
        break;
      case 'customer':
        this.router.navigate(['customerHome']);
        break;
      default:
        this.router.navigate(['main']);
    }
  }


}
