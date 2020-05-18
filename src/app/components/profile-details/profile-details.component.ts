import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/common/profile';
import { User } from 'src/app/common/user';

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

  constructor(private profileService: ProfileService, private activatedRoutes: ActivatedRoute) { }

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
  }

}

