import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotoristaCadastroComponent } from './motorista-cadastro/motorista-cadastro.component';

import { MotoristaPage } from './motorista.page';

const routes: Routes = [
  {
    path: '',
    component: MotoristaPage
  },
  {
    path: 'cadastro',
    component: MotoristaCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: MotoristaCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotoristaPageRoutingModule {}
