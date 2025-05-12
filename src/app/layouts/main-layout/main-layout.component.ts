import { Component } from '@angular/core';
import { NavabrComponent } from '../../shared/components/navabr/navabr.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-main-layout',
  imports: [NavabrComponent, RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  title = 'CarDekho';
  public sidebarShow: boolean = false;
}
