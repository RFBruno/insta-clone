import { Injectable } from "@angular/core";

import { getDatabase, ref, push, set } from "firebase/database";
import { getStorage, ref as refStorage, uploadBytes, uploadBytesResumable} from "firebase/storage";
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

        const nameImg = publicacao.imagem.name + Date.now();

        const storageRef = refStorage(this.storage, `imagens/${nameImg}`);

        const uploadTask = uploadBytesResumable(storageRef, publicacao.imagem);
        
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

            this.progresso.status = 'andamento';
            this.progresso.estado = progress.toString();
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error('Imagem :>',error);
        },)
        

        // const postListRef = ref(this.db, `publicacoes/${btoa(publicacao.email)}`);
        // const newPostRef = push(postListRef);
        // set(newPostRef, {
        //     titulo: publicacao.titulo
        // });
    }

}