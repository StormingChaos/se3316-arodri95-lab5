import { Component, Inject, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {

  constructor(public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
  }

  loginWithRedirect() {
    this.auth.loginWithPopup();
  }

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
