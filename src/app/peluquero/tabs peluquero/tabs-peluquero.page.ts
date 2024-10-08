import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, reader, cut, create, person } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-peluquero',
  templateUrl: 'tabs-peluquero.page.html',
  styleUrls: ['tabs-peluquero.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPeluqueroPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ triangle, ellipse, square, reader,cut, create, person});
  }
}
