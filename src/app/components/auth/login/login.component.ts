import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { exit } from 'process';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  searchMode: boolean;
  loginForm: FormGroup;
  email = '';
  password = '';
  isLoadingResults = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router, private authService: AuthService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {

    this.searchMode = this.activatedRoutes.snapshot.paramMap.has('logout');
    if (this.searchMode) {
      this.authService.logout();
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });


  }

  onFormSubmit(form: NgForm) {
    this.authService.login(form)
      .subscribe(res => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          console.log(res.token);
          this.router.navigate(['ideas']);
        }
      }, (err) => {
        console.log(err);
      });
  }

  register() {
    this.router.navigate(['register']);
  }

}
