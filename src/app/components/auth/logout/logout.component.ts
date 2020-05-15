import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  searchMode: boolean;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.searchMode = this.activatedRoutes.snapshot.paramMap.has('logout');
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.searchMode) {
      this.authService.logout();
      return;
    }

  }
}

