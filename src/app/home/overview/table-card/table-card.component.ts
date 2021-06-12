import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../../table.model';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent implements OnInit {
  @Input() table: Table = null;

  tableNumber: string;

  constructor() {}

  ngOnInit() {}
}
