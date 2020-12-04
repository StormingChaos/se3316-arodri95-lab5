import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(@Inject(DOCUMENT) 
  public doc: Document,
  public auth: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
    console.log(this.auth.isAuthenticated$);
  }
}
