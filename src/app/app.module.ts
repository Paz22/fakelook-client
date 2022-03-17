import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

const routes: Routes = [{ path: 'main', component: MainComponent }];

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
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
