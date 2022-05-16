import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bd } from 'src/app/bd.service';

import { onAuthStateChanged } from 'firebase/auth'
import { Autenticacao } from 'src/app/autenticacao.service';
import { Progresso } from 'src/app/progresso.service';

import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() atualizarTimeLine: EventEmitter<boolean> = new EventEmitter();

  public formulario: FormGroup = this.fb.group({
    titulo : [null]
  })

  public email: string | null = null;
  public imagem: any | null = null;

  public status: string = '';
  public estado: string = '0%';

  constructor(
    public fb: FormBuilder,
    public bdService: Bd,
    public autenticacaoService: Autenticacao,
    public progresso : Progresso
  ) { }

  ngOnInit(): void {
    let auth = this.autenticacaoService.auth;
    onAuthStateChanged(auth, (user) => {
      this.email = user!.email;
    })
  }

  public async publicar() {
    let publicacao = {
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    }
    this.bdService.publicar(publicacao);

    let acompanhamentoUpload = interval(500);
    let continua = new Subject();

    continua.next(true);

    await acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() =>{
        this.status = this.progresso.status;
        this.estado = this.progresso.estado;
        if(this.progresso.status === 'concluido'){
          continua.next(false);
          setTimeout(() => {
            this.atualizarTimeLine.emit(true);
          },1000)
        }
      })
    }

  public preparaImagemUpload(event: Event): void{
    this.imagem = (<HTMLInputElement>event.target).files![0];
  }

}
