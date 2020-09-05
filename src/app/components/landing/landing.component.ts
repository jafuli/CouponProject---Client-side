import { Component, OnInit } from '@angular/core';
import { LogoutService } from 'src/app/services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public logoutService: LogoutService, private router: Router) { }

  ngOnInit(): void {
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
