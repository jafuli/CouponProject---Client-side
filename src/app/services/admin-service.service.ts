import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private client: HttpClient) { }

  addCompany(company: Company) { 
    return this.client.post("http://localhost:8080/admin/addComp/" + sessionStorage.getItem('userId'), company, {responseType:'text'});
  }

  updateCompany(company: Company) {
    return this.client.put("http://localhost:8080/admin/updateComp/" + sessionStorage.getItem('userId'), company, {responseType:'text'});
  }

  deleteCompany(id: number) {
    return this.client.delete("http://localhost:8080/admin/delComp/" + sessionStorage.getItem('userId') + "/" + id, { responseType: 'text' });
  }

  getAllCompanies() {
    return this.client.get<Company[]>("http://localhost:8080/admin/getAllComp/" + sessionStorage.getItem('userId'));
  }

  getOneCompany(id: number) {
    return this.client.get<Company>("http://localhost:8080/admin/oneComp/" + sessionStorage.getItem('userId') + "/" + id);
  }

  addCustomer(customer: Customer) {
    return this.client.post("http://localhost:8080/admin/addCus/" + sessionStorage.getItem('userId'), customer, {responseType:'text'});
  }

  updateCustomer(customer: Customer) {
    return this.client.put("http://localhost:8080/admin/updateCus/" + sessionStorage.getItem('userId'), customer, {responseType:'text'});
  }

  deleteCustomer(id: number) {
    return this.client.delete("http://localhost:8080/admin/delCus/" + sessionStorage.getItem('userId') + "/" + id, { responseType: 'text' });
  }

  getAllCustomers() {
    return this.client.get<Customer[]>("http://localhost:8080/admin/getAllCus/" + sessionStorage.getItem('userId'));
  }

  getOneCustomer(id: number) {
    return this.client.get<Customer>("http://localhost:8080/admin/oneCus/" + sessionStorage.getItem('userId') + "/" + id);
  }

  


}
