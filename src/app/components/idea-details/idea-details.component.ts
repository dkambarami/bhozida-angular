import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/common/idea';
import { ActivatedRoute } from '@angular/router';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit {

  idea: Idea = new Idea();
  constructor(private activatedRoutes: ActivatedRoute, private ideaService: IdeaService) { }


  getIdeaInfo() {
    const id: number = +this.activatedRoutes.snapshot.paramMap.get('id');
    this.ideaService.get(id).subscribe(
      data => {
        this.idea = data;
        console.log(data);
      }
    );
  }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(
      () => this.getIdeaInfo()
    );
  }


}
