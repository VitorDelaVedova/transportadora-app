import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VeiculoCadastroComponent } from './veiculo-cadastro/veiculo-cadastro.component';

import { VeiculoPage } from './veiculo.page';

const routes: Routes = [
  {
    path: '',
    component: VeiculoPage
  },
  {
    path: 'cadastro',
    component: VeiculoCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: VeiculoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculoPageRoutingModule {}
