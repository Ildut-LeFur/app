import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpXsrfTokenExtractor  } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { GarageService } from './core/services/garage.service';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AppComponent } from './app.component';
import { GarageComponent } from './modules/garage/garage.component';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'garage', component: GarageComponent}
]

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headerName = 'X-XSRF-TOKEN';
    let token = this.tokenExtractor.getToken() as string;
    req = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GarageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GarageService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }


