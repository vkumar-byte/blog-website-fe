import { PostService } from './../../services/post.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Post } from '../../post.model';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(BsDatepickerDirective, { static: false })
  datepicker: BsDatepickerDirective;
  blogs: Post[];
  modalRef: BsModalRef;
  constructor(
    private _postService: PostService,
    private _router: Router,
    private modalService: BsModalService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this._postService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
      this._cd.detectChanges();
    });
  }

  deleteBlog(id) {
    this._postService.deleteBlog(id).subscribe((res) => {
      this.getAllBlogs();
      this._cd.detectChanges();
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
      this.getAllBlogs();
      this._cd.detectChanges();
    });
  }

  openBlog(id) {
    this._router.navigateByUrl(`/post/details/${id}`);
  }

  // filterChange() {
  //   this.blogs.sort(
  //     (a, b) =>
  //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   );
  //   this.filterDate = !this.filterDate;

  //   this._cd.detectChanges();
  // }

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }
}
