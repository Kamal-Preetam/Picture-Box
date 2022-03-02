import { Component, OnInit } from '@angular/core';
import { ImageDataService } from '../services/image-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  data: Array<any>;
  totalRecords!: String;
  page: Number = 1;
  errorMessage: string | undefined = undefined;
  constructor(private imageData: ImageDataService) {
    this.data = new Array<any>();
  }

  getImages() {
    // Retrives the data from the image-data service
    this.imageData.getData().subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        console.log(this.data);
        this.totalRecords = data.length;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
  }

  ngOnInit() {
    // calling the function to load images on 1st page load
    this.getImages();
  }
}
