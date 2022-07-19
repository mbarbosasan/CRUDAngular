import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Cliente } from './clientes/clientes';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  http : HttpClient;
  apiURL : String = environment.apiURLBase + '/api/clientes';

  constructor(http : HttpClient) { 
    this.http = http;
  }

  salvar(cliente : Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  atualizar(cliente : Cliente) : Observable<any> {
    const url = `${this.apiURL}/${cliente.id}`;
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  deletarCliente(cliente : Cliente) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}`);
  }

  getClienteById(id: Number) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }
}
