//TODO Code for profile picture is broken.
//TODO We will work on profile picture later

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  title = 'ImageUploaderFrontEnd';
  public selectedFile;
  public event1;
  id: number;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  convertedImage2: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  retrievedImage: any;
  baseUrl = 'http://localhost:8084/check/';

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.id = 1;
    this.getImageByName();
    this.getImageById();
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  // Uploading
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    this.httpClient.post(this.baseUrl + 'upload', uploadData)
      .subscribe(
        res => {
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        err => console.log('Error Occured during saving: ' + err)
      );
  }

  getImageByName() {
    this.httpClient.get(this.baseUrl + 'get/' + this.imageName)
      .subscribe(
        res => {
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        err => console.log('Error Occured during download: ' + err)
      );
  }

  getImageById() {
    this.httpClient.get(this.baseUrl + 'getbyid/' + this.id)
      .subscribe(
        res => {
          this.receivedImageData = res;
          this.base64Data = this.receivedImageData.pic;
          this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        err => console.log('Error Occured during download: ' + err)
      );
  }


}
