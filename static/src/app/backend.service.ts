import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url = "localhost:3000";

  constructor(private http: HttpClient) { }

  getCourseList() :any {
    return this.http.get(`http://${this.url}/api/catalogue`, 
    {observe: 'body', responseType: 'json'});
  }

  getScheduleList() : any {
    return this.http.get(`http://${this.url}/api/catalogue/schedules`,
    {observe: 'body', responseType: 'json'});
  }

  getSubjectList() : any {
    return this.http.get(`http://${this.url}/api/catalogue/subjects`,
    {observe: 'body', responseType:'json'});
  }

  getCourse(subject:string, code:any):any{
    return this.http.get(`http://${this.url}/api/catalogue/subjects/${subject}/${code}`,
    {observe: 'body', responseType:'json'});
  }

  postNewSchedule(name:string):any{
    return this.http.post(`http://${this.url}/api/catalogue/schedules`,
    JSON.stringify({name:name, courses:[]}), httpOptions);
  }

  putSchedule(name:string, courses:Array<object>):any{
    return this.http.put(`http://${this.url}/api/catalogue/schedules/${name}`,
    JSON.stringify({name:name, courses:courses}), httpOptions);
  }

  deleteSchedule(name:string):any{
    return this.http.delete(`http://${this.url}/api/catalogue/schedules/${name}`);
  }

  deleteAllSchedules():any{
    return this.http.delete(`http://${this.url}/api/catalogue/schedules`);
  }

  getSchedule(name:string):any{
    return this.http.get(`http://${this.url}/api/catalogue/schedules/${name}`);
  }
}
