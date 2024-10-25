import { NgClass } from '@angular/common';
import { Component, model } from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [NgClass]
})
export class ModalComponent {

  isOpen = model.required<boolean>();

  onClose(): void {
    this.isOpen.set(!this.isOpen());
  }
}
