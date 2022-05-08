import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Autenticacao } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    senha: [null, [Validators.required, Validators.minLength(6)]],
  });

  public loginValid: boolean = false;

  constructor(
    private autenticacao: Autenticacao,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.formulario);
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void{
    this.formulario.markAsTouched();
    console.log('autentica: ', this.formulario);
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha,
    ).then(data =>{
      this.loginValid = data;
    })

  }

}
