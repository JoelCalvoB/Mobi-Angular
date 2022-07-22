import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacionLayoutComponent } from './layout/autenticacion/autenticacion-layout/autenticacion-layout.component';
import { ContenidoComponent } from './layout/contenido/contenido/contenido.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './layout/contenido/header/header.component';
import { FooterComponent } from './layout/contenido/footer/footer.component';
import { MenuComponent } from './layout/contenido/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/interceptor/interceptor';

;

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionLayoutComponent,
    ContenidoComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,   ///// se agrega interceptor!!!!!
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
