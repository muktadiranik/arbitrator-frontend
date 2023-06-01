import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbitratorGuard } from 'src/app/shared/guards/arbitrator.guard';
import { PlenaryDeactivateGuard } from '../time-log/components/plenary-timer/plenary-timer.component';
import { CaucusDeactivateGuard } from '../time-log/components/caucus-timer/caucus-timer.component';
import { NoteBoardComponent } from './note-board.component';
import { BoardComponent } from './pages/board/board.component';

const routes: Routes = [
  {
    path: '',
    component: NoteBoardComponent,
    canActivate: [ArbitratorGuard],
    children: [
      {
        path: 'board',
        component: BoardComponent,
        canDeactivate: [PlenaryDeactivateGuard],
      },
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteBoardRoutingModule {}
