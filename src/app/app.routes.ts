import { Routes } from '@angular/router';
import { LandingHubComponent } from './components/landing-hub/landing-hub.component';

export const routes: Routes = [
  { path: '', component: LandingHubComponent },
  { path: '**', redirectTo: '' }
];
