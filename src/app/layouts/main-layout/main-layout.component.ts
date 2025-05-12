import { Component } from '@angular/core';
import { NavabrComponent } from '../../shared/components/navabr/navabr.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [NavabrComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  title = 'CarDekho';
  public sidebarShow: boolean = false;
}
