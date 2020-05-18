import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/common/profile';
import { User } from 'src/app/common/user';
import { Form, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  id: number;
  profile: Profile = new Profile();
  user: User = new User();
  books: string[];
  history: string[];
  profileForm: FormGroup;
  yearOfBirth: number;
  maritalStatus: boolean;
  numberOfDirectDependencies: number;
  houseOwnership: boolean;
  carOwnership: boolean;
  biggestExpense: number;
  networthInUSD: number;
  countryOfResidence: string;
  businessType: string;
  entrepreneurHistory: string;
  entrepreneurStartYear: number;
  employees: number;
  mentors: number;
  mentees: number;
  businessRegistered: boolean;
  businessTypesOfInterest: string;
  industriesOfInterest: string;
  financeSkillsInvestor: string;
  businessPartnerAgeGroup: string;
  businessPartnerGenderGroup: string;
  attendedFinancialLiteracyCourses: boolean;
  attendedSalesCoachingCourses: boolean;
  bestThreeMotivationalBooks: string;
  highestQualification: string;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router, private profileService: ProfileService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {

    this.profileService.getUser().subscribe(data => {
      this.user = data;
      localStorage.setItem('id', data.id.toString());
    });
    this.profileService.getProfile(JSON.parse(localStorage.getItem('id'))).subscribe(
      data => {
        this.profile = data;
        this.books = data.bestThreeMotivationalBooks.split(',');
        this.history = data.entrepreneurHistory.split(',');
      });

    this.profileForm = this.formBuilder.group({
      id: [null, Validators.required],
      yearOfBirth: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      numberOfDirectDependencies: [null, Validators.required],
      houseOwnership: [null, Validators.required],
      carOwnership: [null, Validators.required],
      biggestExpense: [null, Validators.required],
      networthInUSD: [null, Validators.required],
      countryOfResidence: [null, Validators.required],
      businessType: [null, Validators.required],
      entrepreneurHistory: [null, Validators.required],
      entrepreneurStartYear: [null, Validators.required],
      employees: [null, Validators.required],
      mentors: [null, Validators.required],
      mentees: [null, Validators.required],
      businessRegistered: [null, Validators.required],
      businessTypesOfInterest: [null, Validators.required],
      industriesOfInterest: [null, Validators.required],
      financeSkillsInvestor: [null, Validators.required],
      businessPartnerAgeGroup: [null, Validators.required],
      businessPartnerGenderGroup: [null, Validators.required],
      attendedFinancialLiteracyCourses: [null, Validators.required],
      attendedSalesCoachingCourses: [null, Validators.required],
      bestThreeMotivationalBooks: [null, Validators.required],
      highestQualification: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.profileService.updateProfile(form)
      .subscribe(res => {
        if (res.token) {
          this.router.navigate(['ideas']);
        }
      }, (err) => {
        console.log(err);
      });
  }


}

