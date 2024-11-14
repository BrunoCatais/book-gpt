import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { BackgroundColorPipe } from 'src/common/background-color.pipe';
import { TextColorPipe } from 'src/common/text-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ChatComponent,
    CommonModule,
    GraphQLModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    IconButtonComponent,
    BackgroundColorPipe,
    TextColorPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
