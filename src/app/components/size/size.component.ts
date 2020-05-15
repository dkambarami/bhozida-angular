import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdeaService } from 'src/app/services/idea.service';
import { Idea } from 'src/app/common/idea';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  sizes: string[] = ['small', 'medium', 'large'];

  constructor(private ideaService: IdeaService, private router: Router) { }

  ngOnInit() {
  }

  listIdeasBySize(keyword: string) {
    this.router.navigateByUrl('/size/' + keyword);
  }

}
