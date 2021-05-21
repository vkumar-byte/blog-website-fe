import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Input() postId;
  @Output() postEdited = new EventEmitter();
  preview: string;
  postForm: FormGroup;
  fileUpdated = false;

  constructor(
    private formBuilder: FormBuilder,
    private _postService: PostService,
    public bsModalRef: BsModalRef
  ) {
    this.postForm = this.formBuilder.group({
      title: '',
      content: '',
      postImage: '',
      tags: [],
    });
  }

  ngOnInit(): void {
    this._postService.getBlog(this.postId).subscribe((blog) => {
      this.postForm.get('title').setValue(blog.title);
      this.postForm.get('content').setValue(blog.content);
      this.postForm.get('tags').setValue(blog.tags);
      this.postForm
        .get('postImage')
        .setValue(`${environment.URI}${blog.postImage}`);
      this.preview = `${environment.URI}${blog.postImage}`;
      console.log(this.postForm.value);
    });
  }

  updatePost() {
    if (!this.fileUpdated) {
      this.uploadImagePopup();
    } else {
      var tagsArray;
      if (Array.isArray(this.postForm.get('tags').value)) {
        tagsArray = this.postForm.get('tags').value;
      } else {
        tagsArray = this.postForm.get('tags').value.split(',');
      }
      this._postService
        .updateBlog(
          this.postId,
          this.postForm.value.title,
          this.postForm.value.content,
          tagsArray,
          this.postForm.value.postImage
        )
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              console.log('Post successfully created!', event.body);
              this.popup();
              this.postEdited.emit(event.body);
          }
        });
    }
  }

  uploadImagePopup() {
    alert('Please upload image');
  }
  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      postImage: file,
    });
    this.fileUpdated = true;
    this.postForm.get('postImage').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  popup() {
    this.bsModalRef.hide();
    alert('Blog successfully Updated! ');
  }
}
