import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

import { AuthButtonComponent } from "../auth-button/auth-button.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [AuthButtonComponent]
})
export class UserProfileComponent implements OnInit {

  constructor(@Inject(DOCUMENT)
  public doc: Document,
  public auth: AuthService,
  public authButton: AuthButtonComponent) { }

  ngOnInit(): void {
  }

  logout() {
    this.authButton.logout();
  }
}
