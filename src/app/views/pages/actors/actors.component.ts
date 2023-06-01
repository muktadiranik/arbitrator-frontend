import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActorsService } from 'src/app/shared/services/actors.service';

@Component({
  selector: 'actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  //  @ViewChild(AllClaimersComponent) claimers: any;
  selectedTab = '';
  actors: any[] = [];
  isloading: boolean = true;
  constructor(private actorSer: ActorsService) {}

  tabs = ['arbitrators', 'claimers', 'respondents', 'witnesses'];

  ngOnInit(): void {
    this.onTabChange(0);
  }
  onTabChange(tabIndex: number) {
    this.selectedTab = this.tabs[tabIndex];
    this.actorSer.getAllActors(this.tabs[tabIndex]).subscribe((actor: any) => {
      this.actors = actor;
      this.isloading = false;
    });
  }
}
