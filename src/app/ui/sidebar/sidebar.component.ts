import { Component } from '@angular/core';
import { SidebarItem } from '@interfaces/sidebar-item.interface';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [SidebarItemComponent]
})
export class SidebarComponent {

  items: SidebarItem[] = [
    { name: "Home", url: "/countries" },
    { name: "Vista 1", url: "/view1" },
    { name: "Vista 2", url: "/view2" },
  ];

}