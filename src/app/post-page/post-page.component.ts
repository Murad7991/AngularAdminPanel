import {Component, OnInit} from '@angular/core';
import {Post} from '../shared/interface';
import {PostService} from '../shared/post.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  posts$: Observable<Post>;
  constructor(private postService: PostService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.posts$ = this.route.params.pipe(switchMap((params: Params) => {
      return this.postService.getPostId(params['id']);
    }));
  }

}
