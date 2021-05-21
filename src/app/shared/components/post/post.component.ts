import { PostService } from './../../services/post.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../../post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  displayedColumns: string[] = ['postTitle', 'postDesc'];
  post: Post;
  isDataLoaded = false;
  modalRef: BsModalRef;
  constructor(
    private _postService: PostService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getPostDetails(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  getPostDetails(id) {
    this._postService.getBlog(id).subscribe((post) => {
      this.post = post;
      this.isDataLoaded = true;
    });
  }

  editBlog(id) {
    const initialState = {
      postId: id,
    };
    this.modalRef = this.modalService.show(EditPostComponent, {
      initialState,
    });
    this.modalRef.content.postEdited.subscribe((post) => {
      this.getPostDetails(id);
      this._cd.detectChanges();
    });
  }

  deletePost(id) {
    this._postService.deleteBlog(id).subscribe((res) => {
      if (res) {
        this._router.navigateByUrl('/');
      }
    });
  }
}
