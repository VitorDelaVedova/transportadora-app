import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { MotoristaPageRoutingModule } from './motorista-routing.module';

import { MotoristaPage } from './motorista.page';
import { MotoristaCadastroComponent } from './motorista-cadastro/motorista-cadastro.component';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MotoristaPageRoutingModule,
    HttpClientModule,
    BrMaskerModule
  ],
  declarations: [MotoristaPage,MotoristaCadastroComponent]
})
export class MotoristaPageModule {}
