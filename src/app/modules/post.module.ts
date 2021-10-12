import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { PostEffects } from '../posts/post.effects';
import { PostListComponent } from '../components/post-list/post-list.component';
import { PostReducer } from '../posts/post.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('postFeature', PostReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostModule {}
