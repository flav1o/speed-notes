import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NotepadComponent } from './pages/notepad/notepad.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotepadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TextareaAutosizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
