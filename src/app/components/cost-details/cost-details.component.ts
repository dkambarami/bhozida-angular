import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/services/idea.service';
import { Cost } from 'src/app/common/cost';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cost-details',
  templateUrl: './cost-details.component.html',
  styleUrls: ['./cost-details.component.css']
})
export class CostDetailsComponent implements OnInit {

  costs: Cost[];
  constructor(private ideaService: IdeaService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(
      () => this.getCostInfo()
    );
  }

  getCostInfo() {
    const id: number = +this.activatedRoutes.snapshot.paramMap.get('id');
    this.ideaService.getCosts(id).subscribe(
      data => {
        this.costs = data;
      }
    );
  }

}
