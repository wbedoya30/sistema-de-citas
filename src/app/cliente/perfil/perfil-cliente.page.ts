import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonInput, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil } from 'ionicons/icons';
import { PerfilService } from '../services/perfil/perfil.service';
import { AlertToastService } from 'src/app/shared/alert-toast.service';
import { AlertController } from '@ionic/angular/standalone';
import { ImagenService } from '../services/imagen/imagen.service';
import { LoginService } from 'src/app/auth/services/login/login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: 'perfil-cliente.page.html',
  styleUrls: ['perfil-cliente.page.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonInput, IonList, IonItem, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
   ],
   providers:[
    PerfilService,
    AlertToastService,
  
  ],
  schemas: [NO_ERRORS_SCHEMA],
})

export class PerfilClientePage {
  user: any = {};
  imageUrl: string | null = null;

  constructor(
    private _perfilService:PerfilService,
    private alertController: AlertController,
    private _alert_loading_Service: AlertToastService,
    private _imagenService: ImagenService,
    private _authService: LoginService,
    private navCtrl: NavController
  ) {
    addIcons({ pencil });
  }

  ngOnInit() {
    this.mostrarPerfil();
  }

  
  
  async tomarFoto(id: number) {
    this.imageUrl = await this._imagenService.takePicture() || null;
    this.subirImagen(id);
  }

  async selecionarImagen(id: number) {
    this.imageUrl = await this._imagenService.selectPicture() || null;
    this.subirImagen(id);
  }

  async subirImagen(id: number) {
    if (this.imageUrl) {
      await this._imagenService.uploadImage(this.imageUrl, id);
    }
    return this.mostrarPerfil();
  }

  async mostrarPerfil() {
    try {
      const data = await this._perfilService.cargarUsuario();
      this.user = data;
    } catch (error) {
      console.error('Error al cargar los servicios', error);
    }
  }
  editarPerfil(data: any, id: number) {
    let UserData = {
      id: id,
      name: data.nombre,
      phone:data.phone,
      nickname:data.nickname
    };
     this._perfilService.editarPerfil(UserData);
    this.mostrarPerfil();
  }

  //Cerrar sesión
  logout() {
    this._authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
//alerta para cerrar sesión
  async LogoutAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.logout();
          }
        },
      ]
    });
    await alert.present();
  }
  
  //alerta para editar imagen
  async openImageOptionsAlert(userId: number) {
    const alert = await this.alertController.create({
      header: 'Seleccionar opción',
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            this.selecionarImagen(userId);
          }
        },
        {
          text: 'Cámara',
          handler: () => {
            this.tomarFoto(userId);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
  
    await alert.present();
  }
  

  //alerta para editar perfil
  async openEditAlert(user: any) {

    const alert = await this.alertController.create({
      header: 'Editar usuario',
      message: '',
      inputs: [
        {
          name: 'nombre',

          placeholder: 'Nombre',
          value: user.name // Prellenar el campo con el nombre actual
        },
        {
          name: 'phone',
          placeholder: 'telefono',
          type:'tel',
          value: user.detail?.phone, // Prellenar el campo con el precio actual
          attributes: {
            inputmode: 'numeric',
            minlength: 8,
            maxlength: 10,
          }
        },
        
      ],
      buttons: [
        {
          text: 'CANCELAR',
        },
        {
          text: 'GUARDAR',
          role: 'GUARDAR',
          handler: (data: any) => {
            const phoneRegex = /^\d{8,}$/;
            
            if (data.phone && !phoneRegex.test(data.phone)) {
              this._alert_loading_Service.alertToastYellow('El teléfono debe tener al menos 8 dígitos.');
              return false; // Evitar el envío
            }
            if (data.nombre) {

              this.editarPerfil(data, user.id); // Llama a la función para editar el servicio
              return true
            } else {
              this._alert_loading_Service.alertToastYellow('Debe llenar todos los campos');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();

  }







  
}