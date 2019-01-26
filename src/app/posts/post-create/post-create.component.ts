import {Component, Input} from '@angular/core';

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

    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
