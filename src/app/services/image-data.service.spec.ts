import { TestBed, async, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ImageDataService } from './image-data.service';

describe('ImageDataService', () => {
  let imageDataService: ImageDataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ImageDataService
      ],
    });
    imageDataService = TestBed.get(ImageDataService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it(`should fetch posts as an Observable`, async(inject([HttpTestingController, ImageDataService],
    (httpClient: HttpTestingController, imageDataService: ImageDataService) => {
      const postItem = [
        {
          "id": "117",
          "author": "Daniel Ebersole",
          "width": 1544,
          "height": 1024,
          "url": "https://unsplash.com/photos/Q14J2k8VE3U",
          "download_url": "https://picsum.photos/id/117/1544/1024"
          },
          {
          "id": "118",
          "author": "Rick Waalders",
          "width": 1500,
          "height": 1000,
          "url": "https://unsplash.com/photos/d-Cr8MEW5Uc",
          "download_url": "https://picsum.photos/id/118/1500/1000"
          },
          {
          "id": "119",
          "author": "Nadir Balcikli",
          "width": 3264,
          "height": 2176,
          "url": "https://unsplash.com/photos/wE9nUW7tMmk",
          "download_url": "https://picsum.photos/id/119/3264/2176"
          }
      ];

      imageDataService.getData()
        .subscribe((posts: any) => {
          expect(posts.length).toBe(3);
        });
      let req = httpMock.expectOne('https://picsum.photos/v2/list?page=2&limit=100');
      expect(req.request.method).toBe("GET");
      req.flush(postItem);
      httpMock.verify();
    })));
});
