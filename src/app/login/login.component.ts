import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
  }

  username = "";
  password = "";

  clearlogin() {
    this.username = "";
    this.password = "";
  }

  login1() {
    let var1 = {
      username: this.username,
      password: this.password,
    }
    console.log("User is", var1);
    this.clearlogin();
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}