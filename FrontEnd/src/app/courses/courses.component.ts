import { Component, OnInit } from '@angular/core';

import {BackendService} from '../backend.service';

class Course{
  subject;
  className;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  courseList = [];
  subjectList = [];
  courseCodes = [];
  subjectSel = "All Subjects";
  courseSel = "All Courses";
  compSel = "All Components";
  subjectDisp = [];
  courseDisp = [];

  courseSearch = "";

  //toggles
  public showList:boolean = true;
  public showSubjects:boolean = false;
  public showCourse:boolean = false;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getSubjects();
  }

  search() : void {
    alert("You entered " + this.courseSearch);
  }

  getCourses() : void {
    this.backend.getCourseList().subscribe(
      (response) => {
        this.courseList = response as unknown as Array<object>;
      },
      (error) => {console.log(error)}
    )
  }

  getSubjects() : void {
    this.backend.getSubjectList().subscribe(
      (response) => {
        let tempList = response as unknown as Array<Course>;

        this.subjectList = [];
        this.subjectList.push(tempList[0]);
        for (let i = 1; i < tempList.length; i++){
          if (tempList[i].subject != tempList[i-1].subject){
            this.subjectList.push(tempList[i]);
          }
        }
      },
      (error) => {console.log(error)}
    )
  }

  getCourseCodes() : void {
    this.courseCodes = [];
    this.courseSel = "All Courses";

    if (this.subjectSel != "All Subjects"){
      this.courseCodes = this.courseList.filter(x => x.subject == this.subjectSel);
      this.subjectDisp = this.courseList.filter(x => x.subject == this.subjectSel);
      this.courseDisp = [];
      this.showSubjects = true;
      this.showCourse = false;
      this.showList = false;
    }
    else{
      this.showList = true;
      this.showSubjects = false;
      this.showCourse = false;
      this.subjectDisp = [];
      this.courseDisp = [];
    }
  }

  getCourse():void{
    if (this.courseSel != "All Courses")
    {
      this.showCourse = true;
      this.showSubjects = false;
      this.showList = false;
      this.backend.getCourse(this.subjectSel, this.courseSel).subscribe(
        (response) => {
          this.courseDisp = response as unknown as Array<object>;
        },
        (error) => {console.log(error)}
      )
    }
    else{
      //toggle subject list on
      this.courseDisp = [];
      this.showCourse = false;
      this.getCourseCodes();
    }
  }
}
