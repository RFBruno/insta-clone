import { Injectable } from "@angular/core";
import { Usuario } from "./acesso/usuario.model";

import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class Autenticacao {

    public token_id?: string;
    public auth = getAuth();
    public db = getDatabase();

    constructor(
        private router: Router
    ){

    }
    
    
    public cadastrarUsuario(usuario: Usuario): Promise<boolean>{

        return createUserWithEmailAndPassword(this.auth ,usuario.email, usuario.senha)
            .then((resposta: any) => {
                
                let param = {
                    email: usuario.email,
                    nome_completo: usuario.nome_completo,
                    nome_usuario: usuario.nome_usuario
                }

                set(ref(this.db, `usuario_detalhe/${btoa(usuario.email)}`), param);
                
                return true;

            })
            .catch((error: Error) => {
                console.error('error :>',error);
                return false;
            })

    }

    public async autenticar(email: string, senha: string): Promise<boolean>{
        await signInWithEmailAndPassword(this.auth, email, senha)
        .then((resp: any) =>{
            this.token_id = resp.user.accessToken;
            localStorage.setItem('idToken', this.token_id!);
            this.router.navigate(['home']);
            return true;
        })
        .catch(err =>{
            console.error(err);
        });
        
        return false
    }

    public autenticado(): boolean{

        if(!this.token_id && localStorage.getItem('idToken')){
            this.token_id = localStorage.getItem('idToken')!;
        }

        if(!this.token_id){
            this.router.navigate(['/']);
        }

        return this.token_id ? true : false;
    }

    public sair(): void{
        signOut(this.auth).then((resp: any) =>{
            localStorage.removeItem('idToken');
            this.token_id = undefined;
            this.router.navigate(['/']);
        }).catch(err =>{
            console.error(err);
        });
    }
}