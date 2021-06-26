import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Veiculo } from './veiculo.model';
import { VeiculoService } from './veiculo.service';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.page.html',
  styleUrls: ['./veiculo.page.scss'],
})
export class VeiculoPage implements OnInit {

  veiculos: Veiculo[];  

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private veiculoService: VeiculoService,
    public actionSheetController: ActionSheetController
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.veiculoService
      .getVeiculos()
      .subscribe(
        (dados) => {
          this.veiculos = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(veiculo: Veiculo) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o veiculo ${veiculo.modelo}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(veiculo)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  async opicoes(veiculo: Veiculo) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',      
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',        
        handler: () => {
         this.confirmarExclusao(veiculo);
        }
      }, {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.edicao(veiculo);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  private edicao(veiculo: Veiculo){
    this.router.navigate(['veiculos/edicao/', veiculo.id]);   
  }

  private excluir(veiculo: Veiculo) {
    this.veiculoService
      .excluir(veiculo.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o veiculo ${veiculo.modelo}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }

}
