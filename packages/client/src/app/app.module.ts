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
import { IconButtonComponent } from 'src/common/components/icon-button/icon-button.component';
import { BackgroundColorPipe } from 'src/common/pipes/background-color.pipe';
import { TextColorPipe } from 'src/common/pipes/text-color.pipe';
import { CdkMenuModule } from '@angular/cdk/menu';

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
    TextColorPipe,
    CdkMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
