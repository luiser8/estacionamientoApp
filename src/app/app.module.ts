import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { ModalEstacionarComponent } from './components/home/modals/estacionar/modalEstacionar.component';
import { ModalFijoComponent } from './components/home/modals/fijo/modalFijo.component';
import { ModalRetirarComponent } from './components/home/modals/retirar/modalRetirar.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComprobanteComponent } from './components/home/modals/comprobante/modalComprobante.component';
import { ModalCheckFijoComponent } from './components/home/modals/checkCodigo/modalCheckFijo.component';

@NgModule({
  declarations: [
    AppComponent,
    PuestosComponent,
    ModalEstacionarComponent,
    ModalFijoComponent,
    ModalRetirarComponent,
    ModalComprobanteComponent,
    ModalCheckFijoComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
    FlexLayoutModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalEstacionarComponent, ModalFijoComponent, ModalRetirarComponent, ModalComprobanteComponent, ModalCheckFijoComponent]
})
export class AppModule { }
