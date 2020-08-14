import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  allCompanies: Company[];
  allCustomers: Customer[];
  filteredCompany: Company[];
  filteredCustomer: Customer[];
  company: Company;

  searchFormCompany: FormGroup;
  searchFormCustomer: FormGroup;

  showSearchResultCompany: boolean = false;
  showSearchResultCustomer: boolean = false;
  showComp: boolean = true;
  showCust: boolean = true;

  msgComp: string;
  msgCust: string;

  tabSelect: number;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private adminService: AdminServiceService, private router: Router) { }

  ngOnInit(): void {
    // tab focus
    this.route.params.subscribe(params => {
      this.tabSelect = params.tabSelect;
    });
    
    this.adminService.getAllCompanies().subscribe(
      (companies) => {
        this.allCompanies = companies;
      }
    );

    this.adminService.getAllCustomers().subscribe(
      (customers) => {
        this.allCustomers = customers;
      }
    );

    this.searchFormCompany = this.fb.group({
      param: ['',],
      searchBy: ['id', Validators.required]
    });

    this.searchFormCustomer = this.fb.group({
      param: ['',],
      searchBy: ['id', Validators.required]
    });

  }

  searchCompany() {

    if (this.searchFormCompany.controls['searchBy'].value == "") {
      this.showSearchResultCompany = false;
      this.msgComp = '';
      return;
    }

    var par = this.searchFormCompany.controls['param'].value;
    switch (this.searchFormCompany.controls['searchBy'].value) {
      case 'id':
        var id1 = parseInt(par);
        this.filteredCompany = this.allCompanies.filter(({ id }) => id === id1);
        break;
      case 'name':
        this.filteredCompany = this.allCompanies.filter(({ name }) => name.startsWith(par, 0));
        break;
      case 'email':
        this.filteredCompany = this.allCompanies.filter(({ email }) => email.startsWith(par, 0));
        break;
    }
    if (this.filteredCompany.length != 0) {
      this.showSearchResultCompany = true;
      this.showComp = true;
      this.msgComp = '';
    } else {
      this.showSearchResultCompany = false;
      this.showComp = false;
      this.msgComp = ' No comapnies found';
    }
  }

  searchCustomer() {

    if (this.searchFormCustomer.controls['searchBy'].value == "") {
      this.showSearchResultCustomer = false;
      this.msgCust = '';
      return;
    }

    var par = this.searchFormCustomer.controls['param'].value;
    switch (this.searchFormCustomer.controls['searchBy'].value) {
      case 'id':
        var id1 = parseInt(par);
        this.filteredCustomer = this.allCustomers.filter(({ id }) => id === id1);
        break;
      case 'email':
        this.filteredCustomer = this.allCustomers.filter(({ email }) => email.startsWith(par, 0));
        break;
    }
    if (this.filteredCustomer.length != 0) {
      this.showSearchResultCustomer = true;
      this.showCust = true;
      this.msgCust = '';
    } else {
      this.showSearchResultCustomer = false;
      this.showCust = false;
      this.msgCust = ' No customer found';
    }
  }

  spliceComp(c: Company) {
    this.allCompanies.splice(this.allCompanies.indexOf(c), 1);
  }

  spliceCust(c: Customer) {
    this.allCustomers.splice(this.allCustomers.indexOf(c), 1);
  }

  toAddCompany() {
    this.router.navigate(['addCompany']);
  }

  toAddCustomer() {
    this.router.navigate(['addCustomer']);
  }

  clearFieldComp() {
    this.searchFormCompany.controls['param'].setValue('');
    this.msgComp = '';
    this.showSearchResultCompany = false;
    this.showComp = true;
  }

  clearFieldCust() {
    this.searchFormCustomer.controls['param'].setValue('');
    this.msgCust = '';
    this.showSearchResultCustomer = false;
    this.showCust = true;
  }

}
