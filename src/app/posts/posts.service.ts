import {PostModel} from './post.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {reduce} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  public newUserEntered = new EventEmitter<boolean>();

  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: PostModel[]}>('http://localhost:3000/posts')
      .subscribe((postData) => {
        this.posts = this.sortArray(postData.posts);
        this.postsUpdated.next([...this.posts]);
      });
  }

  private sortArray(posts: PostModel[]) {
    posts.sort((a, b) => a.content > b.content ? -1 : a.content < b.content ? 1 : 0);
    return posts.slice(0, 5);
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
