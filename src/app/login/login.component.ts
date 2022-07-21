import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username : string;
  password : string;
  cadastrando: boolean;
  mensagemSucesso : string;
  errors : string[];

  constructor(private router : Router, private authService : AuthService ) { }

  onSubmit() {
    this.authService.tentarLogar(this.username, this.password)
    .subscribe(response => {
      const access_token = JSON.stringify(response);
      localStorage.setItem("access_token", access_token);
      this.router.navigate(['/home']);
    }, errorReseponse => {
      this.errors = ["Usuario ou senha incorretos!"];
    })
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario : Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario)
    .subscribe( response => {
      this.mensagemSucesso = "Usuario criado com sucesso, efetue o login!";
      this.cadastrando = false;
      this.username = null;
      this.errors = [];
    }, error => {
      this.mensagemSucesso = null;
      console.log(error);
      this.errors = error.error.errors;
    })
  }

}
