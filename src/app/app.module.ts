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
import { MY_COLOR, MY_MODAL_MESSAGE, MY_MODAL_REPONSE, MY_USER_DATA, MY_USER_TOKEN } from './core/tokens/tokensProviders';
import { BehaviorSubject } from 'rxjs';
import { myTokenUserIndicator } from './core/tokens/tokenRecurso';

import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { ModalRespuesta, TYPE_DIALOG } from './core/modelos/modales';
import { Unary } from '@angular/compiler';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Colores } from './core/modelos/usuarioLogin';

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
    { provide: MY_MODAL_REPONSE, useValue: new BehaviorSubject<ModalRespuesta>({type:TYPE_DIALOG.NOTHING,datos:Unary})},
    { provide: MY_USER_DATA,useValue:new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("datosusuario")||'{}'))},
    { provide: MY_COLOR,useValue:new BehaviorSubject<Colores>({fondo:'#f4f2f2',primario:'#fc4a4a'})}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
