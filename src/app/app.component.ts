import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [    
    { title: 'Motoristas', url: '/motoristas', icon: 'people-circle' },
    { title: 'Veiculos', url: '/veiculos', icon: 'people-circle' },
  ];
  constructor() {}
}
