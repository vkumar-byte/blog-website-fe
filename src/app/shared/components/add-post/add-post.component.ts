import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  preview: string;
  postForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _postService: PostService,
    public bsModalRef: BsModalRef,
    private _router: Router
  ) {
    this.postForm = this.formBuilder.group({
      title: '',
      content: '',
      postImage: '',
      tags: [],
    });
  }

  ngOnInit(): void {}

  addPost(data) {
    let tags = this.postForm.get('tags').value.split(',');
    this.postForm.patchValue({
      tags: tags,
    });
    this._postService
      .postBlog(
        this.postForm.value.title,
        this.postForm.value.content,
        tags,
        this.postForm.value.postImage
      )
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            console.log('Post successfully created!', event.body);
            this.popup();
        }
      });
  }

  popup() {
    this.bsModalRef.hide();
    alert('Blog successfully Added! ');
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      postImage: file,
    });
    this.postForm.get('postImage').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
