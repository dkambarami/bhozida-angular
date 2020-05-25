import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { IdeaService } from './services/idea.service';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { IdeaDetailsComponent } from './components/idea-details/idea-details.component';
import { CostDetailsComponent } from './components/cost-details/cost-details.component';
import { SectorComponent } from './components/sector/sector.component';
import { SizeComponent } from './components/size/size.component';
import { AboutComponent } from './components/about/about.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], redirectTo: 'ideas', pathMatch: 'full' },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileDetailsComponent },
  { path: 'ideas', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: 'logout', component: LogoutComponent, data: { title: 'Logout' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'ideas/:id', canActivate: [AuthGuard], component: IdeaDetailsComponent },
  { path: 'search/:keyword', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: 'sector/:sector', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: 'about', canActivate: [AuthGuard], component: AboutComponent },
  { path: 'size/:size', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: '', canActivate: [AuthGuard], redirectTo: '/ideas', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IdeaListComponent,
    PageNotFoundComponent,
    SearchComponent,
    IdeaDetailsComponent,
    CostDetailsComponent,
    SectorComponent,
    SizeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileDetailsComponent,
    ProfilePictureComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],

  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

