import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sidebar-item',
  standalone: true,
  templateUrl: './sidebar-item.component.html',
  styleUrls:['./sidebar-item.component.css'],
  imports: [NgClass, RouterLink, RouterLinkActive]
})
export class SidebarItemComponent {
  item = input<any>();
}