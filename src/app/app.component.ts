import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repo-list',
  template: `
    <ul>
      <li *ngFor="let repo of repos">{{ repo.name }}</li>
    </ul>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="!repos.length">No
