import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Motorista } from 'src/app/motorista/motorista.model';
import { MotoristaService } from 'src/app/motorista/motorista.service';
import { Veiculo } from 'src/app/veiculo/veiculo.model';
import { VeiculoService } from 'src/app/veiculo/veiculo.service';
import { Carga } from '../carga.model';
import { CargaService } from '../carga.service';

@Component({
  selector: 'app-carga-cadastro',
  templateUrl: './carga-cadastro.component.html',
  styleUrls: ['./carga-cadastro.component.scss'],
})
export class CargaCadastroComponent implements OnInit {


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

  cargaId: number;
  cargaForm: FormGroup;
  motoristas: Motorista[];
  veiculos: Veiculo[];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private cargaService: CargaService,
    private motoristaService: MotoristaService,
    private veiculoService: VeiculoService,
    private router: Router
  ) {
    let carga = {
      id: null,
      motorista: null,
      veiculo: null,
      descricao: null,
      cidadeOrigem: null,
      cidadeDestino: null,
      dataSaida: null,
      dataChegada: null
    };
    this.initializaFormulario(carga);
  }

  ngOnInit() {
    this.getMotoristas();
    this.getVeiculos();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.cargaId = parseInt(id);
      this.cargaService
        .getCarga(this.cargaId)
        .subscribe((carga) => {
          this.initializaFormulario(carga);
        });
    }
  }

  initializaFormulario(carga: Carga) {
    this.cargaForm = new FormGroup({
      motorista: new FormControl(carga.motorista, Validators.required),
      veiculo: new FormControl(carga.veiculo, Validators.required),
      descricao: new FormControl(carga.descricao, Validators.required),
      cidadeOrigem: new FormControl(carga.cidadeOrigem, Validators.required),
      cidadeDestino: new FormControl(carga.cidadeDestino, Validators.required),
      dataSaida: new FormControl(carga.dataSaida, Validators.required),
      dataChegada: new FormControl(carga.dataChegada)
    }
    )
  }

  salvar() {
    const carga: Carga = { ...this.cargaForm.value, id: this.cargaId }
    this.cargaService.salvar(carga).subscribe(
      () => this.router.navigate(['cargas']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `Não foi possível salvar a carga ${carga.descricao}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get motorista() {
    return this.cargaForm.get('motorista');
  }

  get veiculo() {
    return this.cargaForm.get('veiculo');
  }

  get descricao() {
    return this.cargaForm.get('descricao');
  }

  get cidadeOrigem() {
    return this.cargaForm.get('cidadeOrigem');
  }

  get cidadeDestino() {
    return this.cargaForm.get('cidadeDestino');
  }

  get dataSaida() {
    return this.cargaForm.get('dataSaida');
  }

  get dataChegada() {
    return this.cargaForm.get('dataChegada');
  }

  getMotoristas() {
    this.motoristaService
      .getMotoristas()
      .subscribe(
        (dados) => {
          console.log(dados);
          this.motoristas = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

  getVeiculos() {
    this.veiculoService
      .getVeiculos()
      .subscribe(
        (dados) => {
          console.log(dados);
          this.veiculos = dados;
        },
        (erro) => {
          console.error(erro);
        }
      );
  }

}
