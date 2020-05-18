import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  sectors: string[] = ['manufacturing', 'services', 'agriculture'];
  constructor(private ideaService: IdeaService, private router: Router) { }


  ngOnInit() {

  }

  listIdeas(keyword: string) {
    this.router.navigateByUrl('/sector/' + keyword);
  }

}
