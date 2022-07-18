import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Cliente } from './clientes/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  http : HttpClient;
  url : String = "http://localhost:8080/api/clientes"
  
  constructor(http : HttpClient) { 
    this.http = http;
  }

  salvar(cliente : Cliente) : Observable<Cliente> {
    const url = "http://localhost:8080/api/clientes"
    return this.http.post<Cliente>(url, cliente);
  }

  atualizar(cliente : Cliente) : Observable<any> {
    const url = `http://localhost:8080/api/clientes/${cliente.id}`;
    return this.http.put<Cliente>(url, cliente);
  }

  deletarCliente(cliente : Cliente) : Observable<any> {
    return this.http.delete<any>(`${this.url}/${cliente.id}`);
  }

  getClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>("http://localhost:8080/api/clientes");
  }

  getClienteById(id: Number) : Observable<Cliente> {
    return this.http.get<Cliente>(`http://localhost:8080/api/clientes/${id}`);
  }
}
