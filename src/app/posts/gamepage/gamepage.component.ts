import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent {
  @Input() newUserEntered: boolean;

  constructor(public postsService: PostsService) {}

  returnToHomePage() {
    this.newUserEntered = true;
    this.postsService.newUserEntered.emit(this.newUserEntered);
  }
}
