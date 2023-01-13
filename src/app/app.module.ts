import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { MatButtonModule } from "@angular/material/button";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { MessageEffect } from "./state/effects/message.effect";
import { EffectsModule } from "@ngrx/effects";
import { messageReducer } from "./state/reducers/message.reducers";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesComponent } from './messages/messages.component';
import { FormComponent } from './form/form.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    FormComponent,
    ToolbarComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    StoreModule.forRoot({
      message: messageReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([MessageEffect]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
