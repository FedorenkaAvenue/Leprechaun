import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigations/navigations.service';
import { SIDENAV_LINKS } from '../../static/layout';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  public showFiller = true;
  public sidenavLinks = SIDENAV_LINKS;
  @ViewChild('matDrawer') matDrawer: MatDrawerContainer
  constructor(
    private readonly router: Router,
    private readonly navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.closeSidenav();
  }

  private closeSidenav(): void {
    this.router.events.subscribe( () => {
      this.matDrawer.close();
    })
  }
}
