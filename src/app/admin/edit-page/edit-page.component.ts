import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  post: Post;
  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => {
      return this.postService.getPostId(params.id);
    })).subscribe( (post: Post) => {
      this.post = post;
      this.form = new FormGroup( {
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.postService.update({
      ...(this.post),
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe( () => {
      this.router.navigate(['/admin', 'dashboard']);
    }
  );
}}
