import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'teacher',
    component:TeacherComponent
  },
  {
    path:'student',
    component:StudentComponent
  },
  {
    path:'staff',
    component:StaffComponent
  },
  {
    path:'exam',
    component:ExamScheduleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }