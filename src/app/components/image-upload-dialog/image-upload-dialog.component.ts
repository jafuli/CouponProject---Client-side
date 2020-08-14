import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.css']
})
export class ImageUploadDialogComponent implements OnInit {

  url: string;

  constructor(public dialogRef: MatDialogRef<ImageUploadDialogComponent>) { }

  ngOnInit(): void {
  }

  back() {
    this.dialogRef.close();
  }

  update() {
    if (this.url == undefined) {
      this.url = '';
    }
    this.dialogRef.close({ url: this.url });
  }

}
