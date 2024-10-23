import { Component, model, OnInit } from '@angular/core';

@Component({
  selector: 'filter-popover',
  standalone: true,
  templateUrl: './filter-popover.component.html',
  styleUrls: ['./filter-popover.component.css']
})
export class FilterPopoverComponent implements OnInit {

  open = model.required<boolean>();

  ngOnInit(): void {
    console.log('FilterPopoverComponent initialized');
  }
}