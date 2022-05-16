import { Injectable } from "@angular/core";

import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { Progresso } from "./progresso.service";

@Injectable({
    providedIn : 'root'
})
export class Bd{

    public db = getDatabase();
    public storage = getStorage();

    constructor(
        public progresso : Progresso
    )
    {}

    public publicar(publicacao : any): void{

        const postListRef = ref(this.db, `publicacoes/${btoa(publicacao.email)}`);
        const newPostRef = push(postListRef);
        
        set(newPostRef, {
            titulo: publicacao.titulo
        }).then((resposta:any)=>{
            
            const nameImg =   `${newPostRef.key}`;

            const storageRef = refStorage(this.storage, `imagens/${nameImg}`);

            const uploadTask = uploadBytesResumable(storageRef, publicacao.imagem);
            
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                this.progresso.status = 'andamento';
                this.progresso.estado = Math.round(progress).toString();

                if(progress === 100){
                    this.progresso.status = 'concluido';
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.error('Imagem :>',error);
            },)
        });
    }

    public consultaPublicacoes(email: string): Promise<any>{

        return new Promise((resolve, reject) =>{
            const starCountRef = ref(this.db, 'publicacoes/' + btoa(email));
                onValue(starCountRef, (snapshot) => {
                    let publicacoes: any[] = [];
                    
                    snapshot.forEach((chield:any) => {
                        let publicacao = chield.val();
                        
                        getDownloadURL(refStorage(this.storage, `imagens/${chield.key}`))
                            .then((url) => {
                                publicacao.url_imagem = url;

                                onValue(ref(this.db, `usuario_detalhe/${btoa(email)}`), (snapshot) =>{
                                    const data = snapshot.val();
                                    publicacao.nome_usuario = data.nome_usuario;
                                })

                                publicacoes.push(publicacao);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    });

                    resolve(publicacoes);
                });
        });
    }

}