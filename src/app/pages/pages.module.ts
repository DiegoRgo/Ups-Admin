import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


/*Pipes Module*/
import { PipesModule } from '../pipes/pipes.module';

/*importacion de las rutas hijas*/
import { PAGES_ROUTES } from './pages.routes';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profileUser/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { AplicacionComponent } from './aplicaciones/aplicacion.component';





@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        AccoutSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        BusquedaComponent,
        AplicacionesComponent,
        AplicacionComponent

    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
