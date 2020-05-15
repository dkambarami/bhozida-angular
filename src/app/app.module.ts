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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', redirectTo: 'ideas', pathMatch: 'full' },
  { path: 'ideas',  component: IdeaListComponent },
  { path: 'logout', component: LoginComponent, data: { title: 'Logout' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'ideas/:id', canActivate: [AuthGuard], component: IdeaDetailsComponent },
  { path: 'search/:keyword', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: 'sector/:sector', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: 'about', canActivate: [AuthGuard],  component: AboutComponent },
  { path: 'size/:size', canActivate: [AuthGuard], component: IdeaListComponent },
  { path: '', canActivate: [AuthGuard],  redirectTo: '/ideas', pathMatch: 'full' },
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
    HttpClientModule,
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

