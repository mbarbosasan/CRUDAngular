import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/clientes';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestado } from '../servicoPrestado';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clienteLista : Cliente[];
  servico: ServicoPrestado;
  success : Boolean = false;
  errors : String;


  constructor(private clienteService : ClientesService, private service : ServicoPrestadoService ) {
    this.servico = new ServicoPrestado;
  }

  ngOnInit(): void {
    this.clienteService
    .getClientes()
    .subscribe( response => this.clienteLista = response);
  }

  onSubmit() {
    this.service
    .salvar(this.servico)
    .subscribe( response => {
      this.success = true;
      this.errors = null;
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      console.log(errorResponse);
      this.errors = errorResponse.error.errors;
      this.success = false;
    })
  }

}
