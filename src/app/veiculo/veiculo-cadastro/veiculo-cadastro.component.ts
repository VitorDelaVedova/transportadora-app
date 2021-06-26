import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Tipo } from '../tipo.enum';
import { Veiculo } from '../veiculo.model';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculo-cadastro',
  templateUrl: './veiculo-cadastro.component.html',
  styleUrls: ['./veiculo-cadastro.component.scss'],
})
export class VeiculoCadastroComponent implements OnInit {

  veiculoId: number;
  veiculosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private veiculoService: VeiculoService,
    private router: Router,
  ) {
    let veiculo = {
      id: null,
      modelo: null,
      placa: null,
      ano: null,
      tipo: Tipo.Toco,
      foto: null, 
    };
    this.initializaFormulario(veiculo);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id !== undefined) {
      this.veiculoId = parseInt(id);
      this.veiculoService
        .getVeiculo(this.veiculoId)
        .subscribe((veiculo) => {
          this.initializaFormulario(veiculo);
        });
    }
  }

  initializaFormulario(veiculo: Veiculo) {
    this.veiculosForm = new FormGroup({
      modelo: new FormControl(veiculo.modelo, [
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(150),  
      ]),      
      placa: new FormControl(veiculo.placa, [
        Validators.required
      ]),    
      ano: new FormControl(veiculo.ano, [
        Validators.required
      ]),    
      tipo: new FormControl(veiculo.tipo, Validators.required),
      foto: new FormControl(veiculo.foto, [
        Validators.required
      ])     
    }
  )}

  salvar() {
    const veiculo: Veiculo = {...this.veiculosForm.value, id: this.veiculoId}
    this.veiculoService.salvar(veiculo).subscribe(
      () => this.router.navigate(['veiculos']),
      (erro) => {
        console.error(erro);
        this.toastController.create({
          message: `${erro.error}`,
          duration: 5000,
          keyboardClose: true,
          color: 'danger'
        }).then(t => t.present());
      }
    );
  }

  get modelo() {
    return this.veiculosForm.get('modelo');
  }
  get placa() {
    return this.veiculosForm.get('placa');
  }
  get ano() {
    return this.veiculosForm.get('ano');    
  }
  get tipo() {
    return this.veiculosForm.get('tipo');    
  }
  get foto() {
    return this.veiculosForm.get('foto');    
  }
 
}
