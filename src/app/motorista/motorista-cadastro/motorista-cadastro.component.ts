import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Motorista } from '../motorista.model';
import { MotoristaService } from '../motorista.service';

@Component({
  selector: 'app-motorista-cadastro',
  templateUrl: './motorista-cadastro.component.html',
  styleUrls: ['./motorista-cadastro.component.scss'],
})
export class MotoristaCadastroComponent implements OnInit {

  mesesAbreviados = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  motoristaId: number;
  motoristasForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private motoristaService: MotoristaService,
    private router: Router,
  ) {
    let motorista = {
      id: null,
      nome: null,
      cpf: null,
      telefone: null,
      dataNascimento: null,
      foto: null, 
    };
    this.initializaFormulario(motorista);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== undefined) {
      this.motoristaId = parseInt(id);
      this.motoristaService
        .getMotorista(this.motoristaId)
        .subscribe((motorista) => {
          this.initializaFormulario(motorista);
        });
    }
  }

  initializaFormulario(motorista: Motorista) {
    this.motoristasForm = new FormGroup({
      nome: new FormControl(motorista.nome, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      cpf: new FormControl(motorista.cpf, [
        Validators.required
      ]),    
      telefone: new FormControl(motorista.telefone, [
        Validators.required
      ]),    
      dataNascimento: new FormControl(motorista.dataNascimento),
      foto: new FormControl(motorista.foto, [
        Validators.required
      ])     
    }
  )}

  salvar() {
    const motorista: Motorista = {...this.motoristasForm.value, id: this.motoristaId}
    this.motoristaService.salvar(motorista).subscribe(
      () => this.router.navigate(['motoristas']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar o motorista ${motorista.nome}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get nome() {
    return this.motoristasForm.get('nome');
  }
  get cpf() {
    return this.motoristasForm.get('cpf');
  }
  get telefone() {
    return this.motoristasForm.get('telefone');    
  }
  get dataNascimento() {
    return this.motoristasForm.get('dataNascimento');    
  }
  get foto() {
    return this.motoristasForm.get('foto');    
  }
}