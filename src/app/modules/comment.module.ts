import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../components/post/post.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommentReducer } from '../comments/comment.reducer';
import { CommentEffects } from '../comments/comment.effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('commentFeature', CommentReducer),
    EffectsModule.forFeature([CommentEffects]),
  ],
})
export class CommentModule {}
