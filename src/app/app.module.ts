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

import { InterceptorService } from './core/interceptors/interceptor.service';
import { MY_MODAL_MESSAGE, MY_MODAL_REPONSE, MY_USER_TOKEN } from './core/tokens/tokensProviders';
import { BehaviorSubject } from 'rxjs';
import { myTokenUserIndicator } from './core/tokens/tokenRecurso';

import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { ModalRespuesta, TYPE_DIALOG } from './core/modelos/modales';
import { Unary } from '@angular/compiler';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

var global = window;
Amplify.configure(environment.configuracionCognito);

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionLayoutComponent,
    ContenidoComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,   ///// se agrega interceptor!!!!!
      useClass: InterceptorService,
      multi: true,
    },
    { provide: MY_USER_TOKEN, useValue: new myTokenUserIndicator()},
    { provide: MY_MODAL_MESSAGE, useValue: new BehaviorSubject({})},
    { provide: MY_MODAL_REPONSE, useValue: new BehaviorSubject<ModalRespuesta>({type:TYPE_DIALOG.NOTHING,datos:Unary})}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
