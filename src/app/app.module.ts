import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { PostModule } from './modules/post.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { CommentModule } from './modules/comment.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PostModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    CommentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
