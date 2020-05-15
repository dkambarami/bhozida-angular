import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from '../common/idea';
import { Cost } from '../common/cost';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  private baseUrl = 'http://localhost:8084/api/v1/ideas';
  // private sectorUrl = 'http://localhost:8080/api/v1/ideas/search/sector?sector=agriculture';
  private costUrl: string;



  constructor(private httpClient: HttpClient) { }

  getCosts(costId: number): Observable<Cost[]> {
    const costUrl = `${this.baseUrl}/${costId}/costs`;
    return this.httpClient.get<GetResponseCosts>(costUrl).pipe(
      map(response => response._embedded.costs)
    );
  }

  getIdeas(): Observable<Idea[]> {
    const searchUrl = `${this.baseUrl}`;
    return this.httpClient.get<GetResponseIdeas>(searchUrl).pipe(
      map(response => response._embedded.ideas)
    );
  }

  getSectorIdeas(sector: string): Observable<Idea[]> {
    const searchUrl = `${this.baseUrl}/search/sector?sector=${sector}`;
    return this.httpClient.get<GetResponseIdeas>(searchUrl).pipe(
      map(response => response._embedded.ideas)
    );
  }

  getIdeasBySize(size: string): Observable<Idea[]> {
    const searchUrl = `${this.baseUrl}/search/size?size=${size}`;
    return this.httpClient.get<GetResponseIdeas>(searchUrl).pipe(
      map(response => response._embedded.ideas)
    );
  }

  searchIdeas(keyword: string): Observable<Idea[]> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
    return this.httpClient.get<GetResponseIdeas>(searchUrl).pipe(
      map(response => response._embedded.ideas)
    );
  }

  get(ideaId: number): Observable<Idea> {
    const ideaDetailsUrl = `${this.baseUrl}/${ideaId}`;
    return this.httpClient.get<Idea>(ideaDetailsUrl);
  }

}

interface GetResponseIdeas {
  _embedded: {
    ideas: Idea[];
  };
}

interface GetResponseCosts {
  _embedded: {
    costs: Cost[];
  };
}

