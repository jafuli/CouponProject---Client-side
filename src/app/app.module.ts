import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CustomerItemComponent } from './components/customer-item/customer-item.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateCompanyDialogComponent } from './components/update-company-dialog/update-company-dialog.component';
import { UpdateCustomerDialogComponent } from './components/update-customer-dialog/update-customer-dialog.component';
import { CouponItemComponent } from './components/coupon-item/coupon-item.component';
import { UpdateCouponDialogComponent } from './components/update-coupon-dialog/update-coupon-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpErrorInterceptorInterceptor } from './http-error-interceptor.interceptor';
import { CouponItemCustDisplayComponent } from './components/coupon-item-cust-display/coupon-item-cust-display.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { ImageUploadDialogComponent } from './components/image-upload-dialog/image-upload-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    CompanyHomeComponent,
    CustomerHomeComponent,
    LandingComponent,
    NotFoundComponent,
    CompanyItemComponent,
    AddCompanyComponent,
    CustomerItemComponent,
    AddCustomerComponent,
    UpdateCompanyDialogComponent,
    UpdateCustomerDialogComponent,
    CouponItemComponent,
    UpdateCouponDialogComponent,
    AddCouponComponent,
    ConfirmationDialogComponent,
    ToolbarComponent,
    CouponItemCustDisplayComponent,
    CustomerDetailsComponent,
    ImageUploadDialogComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatRadioModule,
    MatTabsModule,
    MatDividerModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,

      useClass: HttpErrorInterceptorInterceptor,

      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
