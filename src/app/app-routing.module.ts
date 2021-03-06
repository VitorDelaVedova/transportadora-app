import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cargas',
    pathMatch: 'full'
  },
  {
    path: 'motoristas',
    loadChildren: () => import('./motorista/motorista.module').then( m => m.MotoristaPageModule)
  },
  {
    path: 'veiculos',
    loadChildren: () => import('./veiculo/veiculo.module').then( m => m.VeiculoPageModule)
  },
  {
    path: 'cargas',
    loadChildren: () => import('./carga/carga.module').then( m => m.CargaPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
