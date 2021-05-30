import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Carga } from './carga.model';
import { CargaService } from './carga.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage implements OnInit {

  cargas: Carga[];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private cargaService: CargaService,
    public actionSheetController: ActionSheetController
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {
  }

  listar() {
    this.cargaService
      .getCargas()
      .subscribe(
        (dados) => {
          this.cargas = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(carga: Carga) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir a carga ${carga.cidadeDestino}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(carga)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  async opcoes(carga: Carga) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',      
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',        
        handler: () => {
         this.excluir(carga);
        }
      }, {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.edicao(carga);
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

  private edicao(carga: Carga){
    this.router.navigate(['cargas/edicao/', carga.id]);   
  }

  private excluir(carga: Carga) {
    this.cargaService
      .excluir(carga.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir a carga ${carga.cidadeDestino}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }

}
