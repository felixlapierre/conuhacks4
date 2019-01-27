import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {
  @Input() newUserEntered: boolean;
  @Input() username: string;
  subscription: Subscription;
  highscore: number;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
  }

  returnToHomePage() {
    this.newUserEntered = true;
    this.postsService.newUserEntered.emit(this.newUserEntered);

    // update code when the fix is there
    console.log(this.postsService.username);
/*    console.log(this.username);
    console.log(this.subscription);*/
    this.highscore = Math.floor(Math.random() * 100) + 40;
    this.postsService.addPost(this.postsService.username, this.highscore.toString());
  }
}
