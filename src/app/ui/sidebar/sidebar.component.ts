import { Component, signal } from '@angular/core';
import { SidebarItem } from '@interfaces/sidebar-item.interface';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [SidebarItemComponent, NgClass]
})
export class SidebarComponent {

  opened = signal<boolean>(true);

  items: SidebarItem[] = [
    { name: "Home", url: "/countries" },
    { name: "Vista 1", url: "/view1" },
    { name: "Vista 2", url: "/view2" },
  ];

  onToggleStatus(): void {
    this.opened.set(!this.opened());
  }
}