import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';



const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "addCompany", component: AddCompanyComponent },
  { path: "addCustomer", component: AddCustomerComponent },
  { path: "customerDetails", component: CustomerDetailsComponent },
  { path: "addCoupon", component: AddCouponComponent },
  { path: "adminHome", component: AdminHomeComponent },
  { path: "companyHome", component: CompanyHomeComponent },
  { path: "customerHome", component: CustomerHomeComponent },
  { path: "main", component: LandingComponent },
  { path: "", redirectTo: "main", pathMatch: "full" },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
