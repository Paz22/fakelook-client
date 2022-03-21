import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MainComponent } from './components/main/main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { AngularCesiumModule } from 'angular-cesium';
import { MapComponent } from './components/map/map.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PostsFeedComponent } from './components/posts-feed/posts-feed.component';
import { HomeComponent } from './components/home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'feed', component: PostsFeedComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NavigationComponent,
    SideBarComponent,
    MainComponent,
    UserRegistrationComponent,
    NewPostComponent,
    MapComponent,
    PostsFeedComponent,
    HomeComponent,
    EditPostComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
