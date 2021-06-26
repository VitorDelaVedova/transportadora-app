import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motorista } from './motorista.model';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  private url = 'http://localhost:8080/transportadora/api/motoristas';

  constructor(
    private httpClient: HttpClient
  ) { }

  getMotoristas(): Observable<Motorista[]> {
    return this.httpClient.get<Motorista[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getMotorista(id: number): Observable<Motorista> {
    return this.httpClient.get<Motorista>(`${this.url}/${id}`);
  }

  private adicionar(motorista: Motorista) {    
    return this.httpClient.post(this.url, motorista);
  }

  private atualizar(motorista: Motorista) {
    return this.httpClient.put(`${this.url}/${motorista.id}`, motorista);
  }

  salvar(motorista: Motorista) {
    if (motorista.id) {
      return this.atualizar(motorista);
    } else {
      delete motorista.id;
      return this.adicionar(motorista);
    }
  }
}
