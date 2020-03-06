import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../providers/images.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-query-image',
  templateUrl: './query-image.page.html',
  styleUrls: ['./query-image.page.scss'],
})
export class QueryImagePage implements OnInit {

  uploading = false;
  uploadedFile: {base64: string, filename: string};
  queryResult: any[];
  range;
  maxQuantity: number;

  constructor(private imagesService: ImagesService,
              private toastController: ToastController) { }

  ngOnInit() {
  }


  // Remove uploaded file
  removeUploadedFile(index) {
    this.uploadedFile = null;
  }

  processFile(fileInput: any) {
    for (var i = 0; i < fileInput.files.length; i++) {
      const file: File = fileInput.files[i];
      const reader = new FileReader();
      reader.onloadend = (event) => { 
        let base64String = reader.result as string;
        this.uploadedFile = {
          base64: base64String,
          filename: file.name
        }
      };
      reader.readAsDataURL(file);
    }
    fileInput.value = "";
  }

  onAccept() {
    this.queryResult = [];
    this.uploading = true;
    this.imagesService.queryImage(this.uploadedFile.base64, this.range).subscribe(
      response => {
        this.uploading = false;
        if (response.closeImages) {
          let images: any[] = response.closeImages;
          this.queryResult = images.map(image => {
            let name: string = image.name;
            let ext = name.substr(name.lastIndexOf('.') + 1);
            let base64src = `data:image/${ext};base64,${image.image}`;
            return {
              base64: base64src,
              name: name,
              distance: image.distance
            }
          });
          this.queryResult.sort((a: any, b: any) => {
            return a.distance - b.distance;
          });
          if (this.maxQuantity && this.maxQuantity > 0) {
            this.queryResult = this.queryResult.slice(0, this.maxQuantity);
          }
        } else {
          this.presentError();
        }
      },
      error => {        
        this.uploading = false;
        console.log(error);
        this.presentError();
      }
    )
  }

  async presentError() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Ocurrió un error',
      duration: 3000
    });
    
    toast.present();      
  }
}
