import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <input type="text" [(ngModel)]="username">
    <button [disabled]="searching" (click)="search()">Search</button>
    <div *ngIf="searching">Loading...</div>
  `
})
export class SearchComponent implements OnInit {
  username = '';
  searching = false;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
  }

  search() {
    this.searching = true;
    this.githubService.getUserRepos(this.username)
      .pipe(
        debounceTime(500), // debounce search requests
        distinctUntilChanged() // ignore duplicate requests
      )
      .subscribe((repos) => {
        console.log(repos);
        this.searching = false;
      }, (error) => {
        console.error(error);
        this.searching = false;
      });
  }
}
