import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from './veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private url = 'http://localhost:3000/veiculos';

  constructor(
      private httpClient: HttpClient
    ) {}
    
    getVeiculos(): Observable<Veiculo[]> {
      return this.httpClient.get<Veiculo[]>(this.url);
    }
  
    excluir(id: number): Observable<Object> {
      return this.httpClient.delete(`${this.url}/${id}`);
    }
  
    getVeiculo(id: number): Observable<Veiculo> {
      return this.httpClient.get<Veiculo>(`${this.url}/${id}`);
    }
  
    private adicionar(veiculo: Veiculo)  {
      return this.httpClient.post(this.url, veiculo);    
    }
  
    private atualizar(veiculo: Veiculo) {
      return this.httpClient.put(`${this.url}/${veiculo.id}`, veiculo);
    }
  
    salvar(veiculo: Veiculo) {
      if(veiculo.id) {
        return this.atualizar(veiculo);
      } else {
        return this.adicionar(veiculo);
      }
    }
}
