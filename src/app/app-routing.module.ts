import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PostComponent } from './component/post/post.component';
import { CommentComponent } from './component/comment/comment.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'post/:userId', component: PostComponent },
  { path: 'comment/:postId', component: CommentComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
