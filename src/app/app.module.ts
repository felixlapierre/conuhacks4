import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatListModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';

import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { GamepageComponent } from './posts/gamepage/gamepage.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    GamepageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    HttpClientModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
