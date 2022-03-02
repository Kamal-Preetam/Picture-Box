import { Component, OnInit } from '@angular/core';
import { ImageDataService } from '../services/image-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  data: Array<any>;
  totalRecords: String = "";
  page: Number = 1;
  errorMessage: string | undefined = undefined;
  constructor(private imageDataService: ImageDataService) {
    this.data = new Array<any>();
  }

  ngOnInit() {
    // calling the function to load images when the page loads
    this.getImages();
  }
  // getImages: subscribes to the ImageDataService and gets the data from the api to display in the UI.
  getImages() {
    // Retrives the data from the image-data service
    this.imageDataService.getData().subscribe(
      (data) => {
        this.data = data;
        this.totalRecords = data.length;
      },
      (error) => {
        // Displaying the error on the UI
        console.log(error);
        this.errorMessage = error;
      }
    );
  }


}
