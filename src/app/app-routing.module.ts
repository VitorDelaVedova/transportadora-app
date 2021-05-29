import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'motoristas',
    pathMatch: 'full'
  },
  {
    path: 'motoristas',
    loadChildren: () => import('./motorista/motorista.module').then( m => m.MotoristaPageModule)
  },
  {
    path: 'veiculos',
    loadChildren: () => import('./veiculo/veiculo.module').then( m => m.VeiculoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
