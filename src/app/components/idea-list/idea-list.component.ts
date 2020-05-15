import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/services/idea.service';
import { Idea } from 'src/app/common/idea';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {

  ideas: Idea[];
  searchMode: boolean;

  constructor(private ideaService: IdeaService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(
      () => {
        this.searchMode = this.activatedRoutes.snapshot.paramMap.has('keyword');
        if (this.searchMode) {
          this.search_ideas();
        } else {
          this.searchMode = this.activatedRoutes.snapshot.paramMap.has('sector');
          if (this.searchMode) {
            this.sector_ideas();
          } else {
            this.searchMode = this.activatedRoutes.snapshot.paramMap.has('size');
            if (this.searchMode) {
              this.size_ideas();
            } else {
              this.list_ideas();
            }
          }

        }
      }
    );
  }

  list_ideas() {
    this.ideaService.getIdeas().subscribe(
      data => this.ideas = data
    );

  }

  search_ideas() {
    const keyword: string = this.activatedRoutes.snapshot.paramMap.get('keyword');
    this.ideaService.searchIdeas(keyword).subscribe(
      data => this.ideas = data
    );
  }

  sector_ideas() {
    const keyword: string = this.activatedRoutes.snapshot.paramMap.get('sector');
    console.log(keyword);
    this.ideaService.getSectorIdeas(keyword).subscribe(
      data => {
        this.ideas = data;
        console.log(data);
      }
    );
  }

  size_ideas() {
    const keyword: string = this.activatedRoutes.snapshot.paramMap.get('size');
    console.log(keyword);
    this.ideaService.getIdeasBySize(keyword).subscribe(
      data => {
        this.ideas = data;
        console.log(data);
      }
    );
  }


}
