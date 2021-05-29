import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaCadastroComponent } from './carga-cadastro/carga-cadastro.component';

import { CargaPage } from './carga.page';

const routes: Routes = [
  {
    path: '',
    component: CargaPage
  },
  {
    path: 'cadastro',
    component: CargaCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: CargaCadastroComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargaPageRoutingModule {}
