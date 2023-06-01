import { Input, NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './actors.component';
import { RegistrationComponent } from '../auth/components/registration/registration.component';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'registration/arbitrator', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorsRoutingModule {}
