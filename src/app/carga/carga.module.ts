import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargaPageRoutingModule } from './carga-routing.module';

import { CargaPage } from './carga.page';
import { CargaCadastroComponent } from './carga-cadastro/carga-cadastro.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CargaPageRoutingModule,
    HttpClientModule
  ],
  declarations: [CargaPage, CargaCadastroComponent]
})
export class CargaPageModule {}
