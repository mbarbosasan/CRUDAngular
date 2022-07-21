import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';
import { Usuario } from './login/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL : string = environment.apiURLBase + "/api/usuarios"
  tokenURL : string = environment.apiURLBase + environment.obterTokenUrl
  clientID : string = environment.clientId;
  clientSecret : string = environment.clientSecret
  jwtHelper : JwtHelperService = new JwtHelperService();
  
  constructor(private http : HttpClient) { 

  }

  encerrarSessao() {
    localStorage.removeItem("access_token");
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;      
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if (token) {
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
    }
    return false;
  }

  salvar(usuario : Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  tentarLogar(username: string, password : string) : Observable<any>  {
    const params = new HttpParams()
                            .set("username", username)
                            .set("password", password)
                            .set("grant_type", "password")

    const headers = {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`)
    }

    return this.http.post(this.tokenURL, params.toString(), { headers } );

  }

}
