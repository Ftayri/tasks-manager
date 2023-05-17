import { Component, OnInit } from '@angular/core';
import { ToDoListService } from 'app/services/to-do-list.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private todolistser: ToDoListService) { }

  ngOnInit() {


  }

}
