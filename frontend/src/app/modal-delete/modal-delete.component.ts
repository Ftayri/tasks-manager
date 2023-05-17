import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>) { }
  public title = "Are you sure?";
  content = "Are you sure you want to delete this item?";
  cancel = "Cancel";
  confirm = "Confirm";

  ngOnInit(): void {
  }

}
