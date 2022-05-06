import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/autenticacao.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = this.fb.group({
    email: [null,[Validators.email, Validators.required]],
    nome_completo: [null, Validators.required],
    nome_usuario: [null, Validators.required],
    senha: [null, [Validators.required, Validators.minLength(8)]]
  })

  constructor(
    public fb: FormBuilder,
    private autenticacao : Autenticacao
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastroUsuario(): void{

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    );

    this.autenticacao.cadastrarUsuario(usuario).then(() => this.exibirPainelLogin());
  }

}
