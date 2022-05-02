import { Component, OnInit } from '@angular/core';

import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyDMwfSbqM7cQ6s0TvzAY1XzwjjcSyKRk4A",
      authDomain: "jta-insta-clone-26e85.firebaseapp.com",
      projectId: "jta-insta-clone-26e85",
      storageBucket: "jta-insta-clone-26e85.appspot.com",
      messagingSenderId: "1006833146847",
      appId: "1:1006833146847:web:9ae9ff3a7dc25ecd20426a",
    };

    initializeApp(firebaseConfig);
    
  }
  
}
