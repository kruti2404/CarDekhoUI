import { Component } from '@angular/core';
import { NavabrComponent } from '../../shared/components/navabr/navabr.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin-layout',
  imports: [NavabrComponent, RouterOutlet, SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  title = 'CarDekho';
  public sidebarShow: boolean = false;
}
