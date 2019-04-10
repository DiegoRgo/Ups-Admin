import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard} from '../services/service.index';
import { ProfileComponent } from './profileUser/profile.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AplicacionesComponent } from './aplicaciones/aplicaciones.component';
import { AplicacionComponent } from './aplicaciones/aplicacion.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard',
              component: DashboardComponent,
              canActivate: [VerificaTokenGuard],
              data: { titulo: ' Home ' }
            },
            { path: 'progress', component: ProgressComponent, data: { titulo: ' Progress ' }  },
            { path: 'grafica1', component: Graficas1Component, data: { titulo: ' Grafica ' }  },
            { path: 'accout-settings', component: AccoutSettingsComponent, data: { titulo: ' Ajustes de Tema ' }  },
            { path: 'profile', component: ProfileComponent, data: { titulo: ' Perfil de usuario ' }  },
            { path: 'aplicacion/:id', component: AplicacionComponent, data: { titulo: ' Nueva App ' }  },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: ' Buscador ' }  },

            // Mantenimineto
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: ' Mantenimiento de Usuarios ' }
            },
            {
                path: 'aplicaciones',
                component: AplicacionesComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: ' Mantenimiento de Aplicaciones ' }
            },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
