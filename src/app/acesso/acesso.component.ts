import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

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

    trigger('animacao-atencao', [
      state('start', style({
        opacity: 1
      })),
      transition('* => start', [
        animate('.3s 0s ease-in-out', keyframes([
          style({ transform:'translateY(10px)'}),
          style({ transform:'translateY(-10px)'}),
          style({ transform:'translateY(10px)'}),
          style({ transform:'translateY(-10px)'}),
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';
  public estadoAtencao: string = '';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  public exibirPainelCadastro(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public animacaoErro(): void{
    this.estadoAtencao = 'start'
    setTimeout(() =>{
      this.estadoAtencao = '';
    },1000)
  }

}
