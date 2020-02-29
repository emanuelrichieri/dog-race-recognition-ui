import { Component } from '@angular/core';
import { ImagesService } from '../providers/images.service';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-upload-images',
  templateUrl: 'upload-images.page.html',
  styleUrls: ['upload-images.page.scss']
})
export class UploadImagesPage {

  uploading = false;
  uploadedFiles: {base64: string, filename: string}[] = [];
  
  constructor(private imagesService: ImagesService,
              private toastController: ToastController ) {}

  // Remove uploaded file
  removeUploadedFile(index) {
    this.uploadedFiles.splice(index, 1);
  }

  processFile(fileInput: any) {
    for (var i = 0; i < fileInput.files.length; i++) {
      const file: File = fileInput.files[i];
      const reader = new FileReader();
      reader.onloadend = (event) => { 
        let base64String = reader.result as string;
        let uploadedFile = {
          base64: base64String,
          filename: file.name
        }
        this.uploadedFiles.push(uploadedFile);
      };
      reader.readAsDataURL(file);
    }
    fileInput.value = "";
  }

  onAccept() {
    this.uploading = true;
    this.imagesService.uploadImages(this.uploadedFiles).subscribe(
      async response => {
        this.uploadedFiles = [];
        this.uploading = false;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Imágenes cargados con éxito',
          duration: 3000
        });
    
        toast.present();      
      }, 
      async error => {        
        this.uploading = false;
        console.log(error);
        const toast = await this.toastController.create({
          color: 'danger',
          message: 'Ocurrió un error',
          duration: 3000
        });
        
        toast.present();      
      }
    )
  }
}
