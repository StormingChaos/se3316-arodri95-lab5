import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import Config from '../AWSURL.json';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url = Config.url;

  constructor(private http: HttpClient) { }

  getCourseList() :any {
    return this.http.get(`${this.url}/api/catalogue`, 
    {observe: 'body', responseType: 'json'});
  }

  getScheduleList() : any {
    return this.http.get(`${this.url}/api/catalogue/schedules`,
    {observe: 'body', responseType: 'json'});
  }

  // getPublicScheduleList() : any {
  //   return this.http.get(`${this.url}/api/catalogue/schedules/public`,
  //   {observe: 'body', responseType: 'json'});
  // }

  getSubjectList() : any {
    return this.http.get(`${this.url}/api/catalogue/subjects`,
    {observe: 'body', responseType:'json'});
  }

  getCourse(subject:string, code:any):any{
    return this.http.get(`${this.url}/api/catalogue/subjects/${subject}/${code}`,
    {observe: 'body', responseType:'json'});
  }

  postNewSchedule(name:string, isPublic:Boolean, description:string, date:any, user:String):any{
    return this.http.post(`${this.url}/api/catalogue/schedules`,
    JSON.stringify({name:name, user:user, date:date, isPublic:isPublic, description:description, courses:[]}), httpOptions);
  }

  putSchedule(name:string, isPublic:Boolean, description:string, date:any, user:String, courses:Array<object>):any{
    return this.http.put(`${this.url}/api/catalogue/schedules/${name}`,
    JSON.stringify({name:name, user:user, description:description, date:date, isPublic:isPublic, courses:courses}), httpOptions);
  }

  deleteSchedule(name:string):any{
    return this.http.delete(`${this.url}/api/catalogue/schedules/${name}`);
  }

  deleteAllSchedules():any{
    return this.http.delete(`${this.url}/api/catalogue/schedules`);
  }

  getSchedule(name:string):any{
    return this.http.get(`${this.url}/api/catalogue/schedules/${name}`,
    {observe: 'body', responseType:'json'});
  }
}
