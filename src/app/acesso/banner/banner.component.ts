import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations : [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public imagens: Imagem[] = [
    new Imagem('visivel', '/assets/banner-acesso/img_1.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_2.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_3.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_4.png'),
    new Imagem('escondido', '/assets/banner-acesso/img_5.png'),
  ]

  public estado: string = 'visivel'

  constructor() { }

  ngOnInit(): void {
    setInterval(() => this.logicaRotacao(), 2000 )
  }

  public logicaRotacao(): void{
    let proxIndex = 0;
    for (let i = 0; i < this.imagens.length; i++) {
      
      if(this.imagens[i].estado === 'visivel'){
        this.imagens[i].estado = 'escondido';
        proxIndex = i === 4 ? 0 : i + 1;
        break;
      }
    }
    this.imagens[proxIndex].estado = 'visivel';
  }

}
