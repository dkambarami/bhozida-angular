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
      id: [this.profile.id,],
      yearOfBirth: [this.profile.yearOfBirth],
      maritalStatus: [this.profile.maritalStatus],
      numberOfDirectDependencies: [this.profile.numberOfDirectDependencies],
      houseOwnership: [this.profile.houseOwnership],
      carOwnership: [this.profile.carOwnership],
      biggestExpense: [this.profile.biggestExpense],
      networthInUSD: [this.profile.networthInUSD],
      countryOfResidence: [this.profile.countryOfResidence],
      businessType: [this.profile.businessType],
      entrepreneurHistory: [this.profile.entrepreneurHistory],
      entrepreneurStartYear: [this.profile.entrepreneurStartYear],
      employees: [this.profile.employees],
      mentors: [this.profile.mentors],
      mentees: [this.profile.mentees],
      businessRegistered: [this.profile.businessRegistered],
      businessTypesOfInterest: [this.profile.businessTypesOfInterest],
      industriesOfInterest: [this.profile.industriesOfInterest],
      financeSkillsInvestor: [this.profile.financeSkillsInvestor],
      businessPartnerAgeGroup: [this.profile.businessPartnerAgeGroup],
      businessPartnerGenderGroup: [this.profile.businessPartnerGenderGroup],
      attendedFinancialLiteracyCourses: [this.profile.attendedFinancialLiteracyCourses],
      attendedSalesCoachingCourses: [this.profile.attendedSalesCoachingCourses],
      bestThreeMotivationalBooks: [this.profile.bestThreeMotivationalBooks],
      highestQualification: [this.profile.highestQualification],
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
    this.router.navigate(['ideas']);
  }

  submitHandler() {
    this.profileService.updateProfile(this.profileForm)
      .subscribe(res => {
        if (res.token) {
          this.router.navigate(['ideas']);
        }
      }, (err) => {
        console.log(err);
      });
  }


}

