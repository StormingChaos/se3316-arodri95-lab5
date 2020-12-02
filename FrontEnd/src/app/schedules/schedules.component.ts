import { Component, OnInit } from '@angular/core';

import { BackendService } from "../backend.service"

class Course{
  subject;
  className;
}

class Schedule{
  name;
  numCourses;
  courses;
}

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  courseList = [];
  scheduleList = [];
  subjectList = [];
  courseCodes = [];
  schName = "";
  scheduleSel = "Choose a Schedule";
  subjectSel = "Choose a Subject";
  courseSel = "Choose a Course";
  pending = [];
  scheduleDisp = new Schedule();
  schNameDisp = "";
  schDispList = [];

  //toggles
  public showTimetable:boolean = false;
  public showList:boolean = true;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getSchedules();
    this.getSubjects();
  }

  getCourses() : void {
    this.backend.getCourseList().subscribe(
      (response) => {
        this.courseList = response as unknown as Array<object>;
      },
      (error) => {console.log(error)}
    )
  }

  getSchedules() : void {
    this.backend.getScheduleList().subscribe(
      (response) => {
        this.scheduleList = response as unknown as Array<object>;
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
    this.courseSel = "Choose a Course";

    if (this.subjectSel != "Choose a Subject"){
      this.courseCodes = this.courseList.filter(x => x.subject == this.subjectSel);
    }
  }

  createSchedule() : void {
    if (this.schName.length <= 20)
    {
      this.backend.postNewSchedule(this.schName).subscribe(
        (response) => {
          alert(`Schedule created successfully`);
          this.getSchedules();
        },
        (error) => {console.log(error);alert(`Schedule Creation Failed: ${error.error}`)}
      )
    }
    else{
      alert(`Error: Schedule name exceeds 20 characters`);
    }
  }

  addCourse():void{
    if (this.subjectSel != "Choose a Subject")
    {
      if(this.courseSel != "Choose a Course")
      {
        //check for duplicate course
        let dup = this.pending.findIndex(c => c.subject == this.subjectSel && c.catalog_nbr == this.courseSel);
        if (dup == -1)
        {
          //add course to pending list
          this.pending.push({subject:this.subjectSel, catalog_nbr:this.courseSel});
        }
        else{
          alert("Error: Cannot add duplicate course");
        }
      }
      else{
        alert("Error: Must choose a course to add");
      }
    }
    else{
      alert("Error: Must choose a course to add");
    }
  }

  clearSelections():void{
    this.pending = [];
  }

  updateSchedule():void{
    if (this.scheduleSel != "Choose a Schedule")
    {
      if (this.pending.length != 0)
      {
        this.backend.putSchedule(this.scheduleSel, this.pending).subscribe(
          (response) => {
            alert(`Courses added to schedule \'${this.scheduleSel}\' successfully`);
            this.pending = [];
          },
          (error) => {console.log(error)}
        )
      }
      else{
        alert("Error: No Courses Chosen");
      }
    }
    else{
      alert("Error: No Schedule Selected");
    }
  }

  deleteSchedule():void {
    if (this.scheduleSel != "Choose a Schedule"){
      let temp = this.scheduleSel;
      this.backend.deleteSchedule(this.scheduleSel).subscribe(
        (response) => {
          alert(`Schedule \'${temp}\' was deleted`);
          this.getSchedules();
        },
        (error) => {
          if (error["status"] == 200)
          {
            alert(`Schedule \'${temp}\' was deleted`);
            this.getSchedules();
          }
          else{
            console.log(error);
            alert("Error deleting schedule");
          }
        }
      )
    }
    else{
      alert("Error: No Schedule Selected");
    }
  }

  deleteAllSchedules():void{
    this.backend.deleteAllSchedules().subscribe(
      (response) => {
        alert("All Schedules Deleted");
        this.getSchedules();
      },
      (error) => {
        if (error["status"] == 200)
          {
            alert(`All Schedules Deleted`);
            this.getSchedules();
          }
          else{
            console.log(error);
            alert("Error Deleting Schedules");
          }
      }
    )
  }

  displaySchedule():void{
    this.showList = false;
    this.showTimetable = true;
    this.schDispList = [];
    if (this.schNameDisp != "All Schedules")
    {
      this.backend.getSchedule(this.schNameDisp).subscribe(
        (response) => {
          this.scheduleDisp = response as unknown as Schedule;

          for (var i = 0; i < this.scheduleDisp.courses.length; i++)
          {
            this.backend.getCourse(this.scheduleDisp.courses[i].subject, this.scheduleDisp.courses[i].catalog_nbr).subscribe(
              (response) => {
                this.schDispList.push(response[0] as unknown as Array<object>);
              },
              (error) => {console.log(error)}
            )
          }
        },
        (error) => {console.log(error)}
      )
    }
    else{
      // toggle timetable display off
      //toggle full list on
      this.scheduleDisp = new Schedule();
      this.showTimetable = false;
      this.showList = true;
      this.getSchedules();
    }
  }
}
