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
  @Output() public errorLogin: EventEmitter<boolean> = new EventEmitter<boolean>();

  public formulario: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    senha: [null, [Validators.required, Validators.minLength(6)]],
  });

  public loginValid: boolean = false;
  public pristine: boolean = true;

  constructor(
    private autenticacao: Autenticacao,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void{
    this.formulario.markAsTouched();
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha,
    ).then(data =>{
      this.loginValid = data;
      this.pristine = false;

      this.errorLogin.emit(true);
    })

  }

}
