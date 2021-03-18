import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router,
              public auth: AuthService,
              private alert: AlertService) { }

  ngOnInit() {}
  logout(event: Event) {
    event.preventDefault();
    this.auth.logOut();
    this.router.navigate(['/admin', 'login']);
  }
}
