import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('StudentList');
    this.customerlist = JSON.parse(data || '');
  }

  studentForm: FormGroup;
  customerlist: any = [];
  // firstname1 = "";
  // lastname1 = "";
  // email1 = "";
  // contact1 = "";
  iseditclicked1 = "no";
  indexselected1 = "";
  issubmitted = false;

  clear1() {
    this.studentForm.reset();
    // this.firstname1 = "";
    // this.lastname1 = "";
    // this.email1 = "";
    // this.contact1 = "";
  }

  edit1(i: any) {
    this.iseditclicked1 = "yes";
    this.indexselected1 = i;
    this.studentForm.patchValue(
      {
        firstname1:this.customerlist[i].firstname1,
        lastname1:this.customerlist[i].lastname1,
        email1:this.customerlist[i].email1,
        // contact1:this.customerlist[i].contact1
      }
    )
    // this.firstname1 = this.customerlist[i].firstname1;
    // this.lastname1 = this.customerlist[i].lastname1;
    // this.email1 = this.customerlist[i].email1;
    // this.contact1 = this.customerlist[i].contact1;
  }

  delete1(i: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerlist.splice(i, 1);
        localStorage.setItem('StudentList', JSON.stringify(this.customerlist));
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
          )
      }
    })
  }

  update1() {
    this.iseditclicked1 = "no";
    this.customerlist[this.indexselected1].firstname1 = this.studentForm.value.firstname1;
    this.customerlist[this.indexselected1].lastname1 = this.studentForm.value.lastname1;
    this.customerlist[this.indexselected1].email1 = this.studentForm.value.email1;
    // this.customerlist[this.indexselected1].contact1 = this.studentForm.value.contact1;
    localStorage.setItem('StudentList', JSON.stringify(this.customerlist));
    this.clear1();
    this.modalRef?.hide();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  submit1() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj1 = {
    //   // firstname1: this.firstname1,
    //   // lastname1: this.lastname1,
    //   // email1: this.email1,
    //   // contact1: this.contact1,
    // }

    // console.log("customer is", obj1);
    this.customerlist.push(this.studentForm.value);
    localStorage.setItem('StudentList', JSON.stringify(this.customerlist));
    this.issubmitted = true;
    this.clear1();
    this.modalRef?.hide();
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private FormBuilder: FormBuilder) {
     this.studentForm = this.FormBuilder.group(
      {
        firstname1:['',Validators.compose([Validators.required, Validators.minLength(3)])],
        lastname1:['',Validators.compose([Validators.required, Validators.minLength(3)])],
        email1:['',Validators.compose([Validators.required, Validators.minLength(3)])],
        // contact1:['']
      }
     )
   }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}