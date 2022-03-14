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
import { MainComponent } from './components/main/main.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

const routes: Routes = [{ path: 'main', component: MainComponent }];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NavigationComponent,
    SideBarComponent,
    MainComponent,
    UserRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
