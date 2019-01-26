import {Component, OnInit} from '@angular/core';
import {PostsService} from './posts/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  newUser = true;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.newUserEntered
      .subscribe(
        (newUser: boolean) => {
          this.newUser = newUser;
        }
      );

  }
}
