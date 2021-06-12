import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../../table.model';

@Component({
  selector: 'app-table-detail-card',
  templateUrl: './table-detail-card.component.html',
  styleUrls: ['./table-detail-card.component.scss'],
})
export class TableDetailCardComponent implements OnInit {
  @Input() table: Table;

  constructor() {}

  ngOnInit() {}
}
