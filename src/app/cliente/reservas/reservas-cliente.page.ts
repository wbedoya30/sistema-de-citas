import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-reservas-cliente',
  templateUrl: 'reservas-cliente.page.html',
  styleUrls: ['reservas-cliente.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ],
})
export class ReservasClientePage {
  constructor() {}
}
