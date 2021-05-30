import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Motorista } from './motorista.model';
import { MotoristaService } from './motorista.service';


@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {

  motoristas: Motorista[];  

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private motoristaService: MotoristaService,
    public actionSheetController: ActionSheetController
  ) { }

  ionViewWillEnter() {
    this.listar();
  }

  ngOnInit() {}

  listar() {
    this.motoristaService
      .getMotoristas()
      .subscribe(
        (dados) => {
          this.motoristas = dados;
        }, 
        (erro) => {
          console.error(erro);
        }
      );
  }

  confirmarExclusao(motorista: Motorista) {
    this.alertController.create({
      header: 'Confirmação de exclusão', 
      message: `Deseja excluir o motorista ${motorista.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => this.excluir(motorista)
        },
        {
          text: 'Não',
        }
      ]
    }).then(alerta => alerta.present());
  }

  async opcoes(motorista: Motorista) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',      
      buttons: [{
        text: 'Excluir',
        role: 'destructive',
        icon: 'trash',        
        handler: () => {
         this.excluir(motorista);
        }
      }, {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.edicao(motorista);
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

  private edicao(motorista: Motorista){
    this.router.navigate(['motoristas/edicao/', motorista.id]);   
  }

  private excluir(motorista: Motorista) {
    this.motoristaService
      .excluir(motorista.id)
      .subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController.create({
            message: `Não foi possível excluir o motorista ${motorista.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger'
          }).then(t => t.present());
        }
      );
  }
}


