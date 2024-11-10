import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, NO_ERRORS_SCHEMA  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFabButton, IonIcon, IonItem, IonCheckbox, IonFab, IonTabs, IonTabBar, IonTabButton, IonListHeader, IonLabel } from '@ionic/angular/standalone';
import { ServiciosService } from '../../../services/peluqueria/servicios/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { add, createOutline, reload, trashOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/shared/toast/toast.service';
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: true,
  imports: [IonLabel, IonListHeader, IonTabButton, IonTabBar, IonTabs, IonFab, IonCheckbox, IonItem, IonIcon, IonFabButton, IonList, IonHeader, IonToolbar, IonTitle, IonContent, NgFor,
    CommonModule,
    FormsModule
  ],

  schemas: [NO_ERRORS_SCHEMA],
})
export class ServiciosPage implements OnInit {
  services: any[] = [];

  constructor(
     private _serviciosService:ServiciosService,
     private _alert_loading_Service: ToastService,
     private alertController: AlertController,
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline,
      'add': add,
    });
  }
  
  ngOnInit() {
    this.mostrarServicios();
  }

  ionViewWillEnter() {
    this.mostrarServicios(); // Llamamos a mostrarServicios aquí para actualizar la lista cada vez que la página es visible
  }

  async mostrarServicios() {
    try {
      const data = await this._serviciosService.cargarServicios();
      this.services = data;  // Asigna los datos al array
      console.log(this.services);  // Aquí tendrás los servicios cargados
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }

  async agregarServicio(data: any) {
    let serviceData = {
      name: data.nombre,
      price: data.precio,
    };
    await this._serviciosService.crearServicio(serviceData); // espera a que el servicio sea creado
    await this.mostrarServicios(); // luego recarga los servicios
  }

  async editarServicio(data: any, id: number) {
    let serviceData = {
      id: id,
      name: data.nombre,
      price: data.precio,
    };
    await this._serviciosService.editarServicios(serviceData); // espera la edición
    await this.mostrarServicios(); // luego recarga los servicios
  }
  
  async eliminarServicio(id: number) {
    await this._serviciosService.eliminarServicios(id); // espera a que se elimine
    await this.mostrarServicios(); // recarga los servicios
  }

  //alerta para eliminar servicio
  async DeleteServiceAlert(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea eliminar el servicio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar servicio',
          handler: () => {
            this.eliminarServicio(id);
          }
        },
      ]
    });
    await alert.present();
    
  }
  // Función para abrir la alerta de agregar servicio y limpiar los campos
async openAddServiceAlert() {
  const alert = await this.alertController.create({
    header: 'Agregar Servicio',
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: '' // Limpia el campo de nombre
      },
      {
        name: 'precio',
        placeholder: 'Precio',
        type: 'text',
        value: '', // Limpia el campo de precio
        attributes: {
          inputmode: 'numeric',
          maxlength: 6,
          oninput: (event: any) => this.formatPrice(event)
        }
      }
    ],
    buttons: [
      {
        text: 'CANCELAR',
      },
      {
        text: 'GUARDAR',
        role: 'GUARDAR',
        handler: (data: any) => {
          if (data.nombre && data.precio) {
            data.precio = this.removeFormatting(data.precio);
            this.agregarServicio(data);
            return true;
          } else {
            this._alert_loading_Service.toastYellow('Debe llenar todos los campos');
            return false;
          }
        }
      }
    ]
  });

  await alert.present();
}

/*----------------------EDITAR---------------------*/
async openEditAlert(service: any) {
  const alert = await this.alertController.create({
    header: 'Editar Servicio',
    inputs: [
      {
        name: 'nombre',
        placeholder: 'Nombre',
        value: service.name // Prellenar el campo con el nombre actual
      },
      {
        name: 'precio',
        placeholder: 'Precio',
        value: this.formatPriceShow(service.price), // Prellenar el campo con el precio actual
        type: 'text',
        attributes: {
          inputmode: 'numeric',
          maxlength: 6,
          oninput: (event: any) => this.formatPrice(event)
        }
      }
    ],
    buttons: [
      {
        text: 'CANCELAR',
      },
      {
        text: 'GUARDAR',
        role: 'GUARDAR',
        handler: (data: any) => {
          if (data.nombre && data.precio) {
            data.precio = this.removeFormatting(data.precio);
            this.editarServicio(data, service.id); // Llama a la función para editar el servicio
            return true
          } else {
            this._alert_loading_Service.toastYellow('Debe llenar todos los campos');
            return false;
          }
        }
      }
    ]
  });

  await alert.present();
}

/*-------------------------------------------*/
  formatPrice(event: any) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return input.value = value;
  }
  removeFormatting(value: string): number {
    return parseInt(value.replace(/\./g, ''), 10);
  }

  formatPriceShow(value: number): string {
    let stringValue = value.toString().replace(/\D/g, '');
    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return stringValue;
  }

  getFormattedPrice(price: number): string {
    return this.formatPriceShow(price);
  }
  
}