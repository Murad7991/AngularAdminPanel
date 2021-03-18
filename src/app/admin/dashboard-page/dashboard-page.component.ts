import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interface';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  post: Post[] = [];
  search: '';
  constructor(private posts: PostService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.posts.getAll().subscribe( posts => {
      this.post = posts;
    });
  }

  removePost(id: string) {
    this.posts.removePost(id).subscribe( () => {
      this.post = this.post.filter( p => p.id !== id);
      this.alertService.danger('Post deleted');
    });
  }
}
