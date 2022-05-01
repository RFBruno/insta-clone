import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-80px, 0px)'
        }),
        animate('.6s 0s ease-in-out') //(duracao delay aceleracao)
      ])
    ]),

    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(80px, 0)'
        }),
        animate('.6s 0s ease-in-out') //(duracao delay aceleracao)
      ])
    ]),
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

}
