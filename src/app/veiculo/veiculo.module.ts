import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeiculoPageRoutingModule } from './veiculo-routing.module';

import { VeiculoPage } from './veiculo.page';
import { HttpClientModule } from '@angular/common/http';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VeiculoPageRoutingModule,
    HttpClientModule
  ],
  declarations: [VeiculoPage, VeiculoCadastroComponent]
})
export class VeiculoPageModule {}
