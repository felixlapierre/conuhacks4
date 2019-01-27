import {Component, Input, Output} from '@angular/core';

import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  @Input() newUserEntered: boolean;

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    this.newUserEntered = false;
    this.postsService.newUserEntered.emit(this.newUserEntered);

    console.log(form.value.title);
    this.postsService.sendUsername(form.value.title);

/*    if (form.invalid) {
      return;
  }*/
    // this.postsService.addPost('haha', '123');
    // form.resetForm();
  }
}
