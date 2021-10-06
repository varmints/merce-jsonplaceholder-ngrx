import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from '../components/post-list/post-list.component';
import { StoreModule } from '@ngrx/store';
import { PostReducer } from '../posts/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from '../posts/post.effects';

@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('postFeature', PostReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
})
export class PostModule {}
