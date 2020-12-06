import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public backend: BackendService) { }

  ngOnInit(): void {
  }

  // getPublicSchedules(){
  //   this.backend.getPublicScheduleList();
  // }

}