import { Injectable } from "@angular/core";
import { Usuario } from "./acesso/usuario.model";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Injectable({
    providedIn: 'root'
})
export class Autenticacao {

    
    
    public cadastrarUsuario(usuario: Usuario): void{
        console.log('Chegamos ate o servico :>', usuario);

        let auth = getAuth();
        const db = getDatabase();


        createUserWithEmailAndPassword(auth ,usuario.email, usuario.senha)
            .then((resposta: any) => {
                
                let param = {
                    email: usuario.email,
                    nome_completo: usuario.nome_completo,
                    nome_usuario: usuario.nome_usuario
                }

                console.log('respo', resposta);
                
                // firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                //     .set(param);

                set(ref(db, `usuario_detalhe/${btoa(usuario.email)}`), param);

            })
            .catch((error: Error) => {
                console.error('error :>',error);
            })
    }
}