import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';
import { NbThemeModule } from '@nebular/theme';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, RouterModule,  NbThemeModule, RouterLink,],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  title = 'CarDekho';
  public sidebarShow: boolean = false;
  constructor() { }
}
