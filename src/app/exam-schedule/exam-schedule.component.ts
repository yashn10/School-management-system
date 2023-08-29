import { Component, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})
export class ExamScheduleComponent implements OnInit {

  ngOnInit(): void {

    let data = localStorage.getItem('Examlist');
    this.statementlist = JSON.parse(data || '');
  }

  positionForm: FormGroup;
  statementlist: any = [];
  // firstname3 = "";
  // lastname3 = "";
  // email3 = "";
  // contact3 = "";
  iseditclicked3 = "no";
  indexselected3 = "";
  issubmitted = false;

  clear3() {
    this.positionForm.reset();
    // this.firstname3 = "";
    // this.lastname3 = "";
    // this.email3 = "";
    // this.contact3 = "";
  }

  submit3() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    // let obj3 = {
    //   firstname3: this.firstname3,
    //   lastname3: this.lastname3,
    //   email3: this.email3,
    //   contact3: this.contact3,
    // }

    this.issubmitted = true;
    this.statementlist.push(this.positionForm.value);
    localStorage.setItem('Examlist', JSON.stringify(this.statementlist));
    this.clear3();
    this.modalRef?.hide();
  }

  edit3(i: any) {
    this.iseditclicked3 = "yes";
    this.indexselected3 = i;
    this.positionForm.patchValue(
      {
        positionID: this.statementlist[i].positionID,
        positionName: this.statementlist[i].positionName,
        positionType: this.statementlist[i].positionType,
        // position: this.statementlist[i].examcontact3
      }
    )
    console.log(this.positionForm.value)
  }

  delete3(i: any) {
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
        this.statementlist.splice(i, 1);
        localStorage.setItem('Examlist', JSON.stringify(this.statementlist));
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    })
  }

  update3() {
    this.iseditclicked3 = "no";
    this.statementlist[this.indexselected3].positionID = this.positionForm.value.positionID;
    this.statementlist[this.indexselected3].positionName = this.positionForm.value.positionName;
    this.statementlist[this.indexselected3].positionType = this.positionForm.value.positionType;
    // this.statementlist[this.indexselected3].examcontact3 = this.positionform.value.examcontact3;
    localStorage.setItem('Examlist', JSON.stringify(this.statementlist));

    this.clear3();
    this.modalRef?.hide();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your data has been updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private FormBuilder: FormBuilder) {
    this.positionForm = this.FormBuilder.group(
      {
        positionID: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        positionName: ['',Validators.compose([Validators.required, Validators.minLength(3)])],
        positionType: ['',Validators.compose([Validators.required, Validators.minLength(3)])]
        // examcontact3: ['']
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}