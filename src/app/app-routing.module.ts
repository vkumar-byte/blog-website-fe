import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './shared/components/add-post/add-post.component';
import { EditPostComponent } from './shared/components/edit-post/edit-post.component';
import { HomeComponent } from './shared/components/home/home.component';
import { PostComponent } from './shared/components/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Blog Home' },
  },
  {
    path: 'post/details/:id',
    component: PostComponent,
    data: { title: 'Post Details' },
  },
  {
    path: 'post/edit/:id',
    component: EditPostComponent,
    data: { title: 'Post Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
