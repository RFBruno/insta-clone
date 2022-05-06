import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Autenticacao } from "./autenticacao.service";

@Injectable({
    providedIn: 'root'
})
export class AutenticacaoGuard implements CanActivate {
    
    constructor(
        private autenticacao: Autenticacao
    ){}

    public canActivate(): boolean{
        return this.autenticacao.autenticado();
    }
}