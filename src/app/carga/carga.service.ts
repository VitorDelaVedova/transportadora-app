import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carga } from './carga.model';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  private url = 'http://localhost:3000/cargas';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCargas(): Observable<Carga[]> {
    return this.httpClient.get<Carga[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getCarga(id: number): Observable<Carga> {
    return this.httpClient.get<Carga>(`${this.url}/${id}`);
  }

  private adicionar(carga: Carga) {
    return this.httpClient.post(this.url, carga);
  }

  private atualizar(carga: Carga) {
    return this.httpClient.put(`${this.url}/${carga.id}`, carga);
  }

  salvar(carga: Carga) {
    if (carga.id) {
      return this.atualizar(carga);
    } else {
      return this.adicionar(carga);
    }
  }
}
