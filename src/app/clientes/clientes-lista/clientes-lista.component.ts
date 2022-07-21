import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: String;
  mensagemErro: String;

  constructor(
     private service: ClientesService,
     private router: Router) {

   }

  ngOnInit(): void {
    this.service.getClientes()
    .subscribe( response => this.clientes = response);
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service.deletarCliente(this.clienteSelecionado)
    .subscribe(response => {
      this.mensagemSucesso = "O cliente foi deletado com sucesso!"
      this.ngOnInit();
    }, errorMessage => {
      this.mensagemErro = "Nao foi possivel deletar o cliente."
    })
  }

}
