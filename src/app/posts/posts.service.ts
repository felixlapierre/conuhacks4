import {PostModel} from './post.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  public newUserEntered = new EventEmitter<boolean>();

  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: PostModel[]}>('http://localhost:3000/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: PostModel = {id: null, title: title, content: content};
    this.httpClient.post<{message: string}>('http://localhost:3000/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
