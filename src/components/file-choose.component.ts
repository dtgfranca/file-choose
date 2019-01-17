import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

import { Platform } from 'ionic-angular';


@Component({
	selector: 'file-choose',
	template: `<div *ngIf="!isIOS">
	<button ion-button icon-left full small round (click)="fileChoose()"><ion-icon name="folder"></ion-icon>{{text}}</button>
</div>

<div *ngIf="isIOS">
	<input type="file" id="fileUpload" class="ios-file-input" (change)="onFileFromStorageChosen($event)" />
	<button ion-button full small icon-left round class="top-button">
		<ion-icon name="folder"></ion-icon>
		{{text}}
	</button>
</div>`


})
export class FileChooseComponent {

	@Input('value') text: string;
	@Output() filename : EventEmitter<string> = new EventEmitter();
	isIOS: boolean;

	constructor(
		private fileChooser: FileChooser, 
		private file: File, 
		private filePath: FilePath,
		private platform: Platform) {

		this.isIOS = this.platform.is('ios');

	}

	fileChoose(){

		this.fileChooser.open()
		.then(uri => {

			this.file.resolveLocalFilesystemUrl(uri)
			.then((data)=>{
 				
 				this.filePath.resolveNativePath(uri)
 				.then((filepath)=>{
 					this.filename.emit(filepath)
 				})
 				.catch(e=>{
 					console.log(e)
 				})
 			})

		})
		.catch(e => console.log(e));

	}
	onFileFromStorageChosen(event: any){
		
		this.processFileFromStorage(event)
		
	}


	private processFileFromStorage(event: any) {
		let file = event.target.files[0];
    	//you can read various properties of the file (like mimetype and size) from the file object.
    	console.log(file);
    	this.readfile(file);
	}

	//this one reads the contents of the file as a URL that contains its data:

	private readfile(file: any): void {
		let reader = new FileReader();
		reader.onload = (e) => {
			let dataUrl = reader.result;
			this.filename.emit(dataUrl);
		};
		reader.readAsDataURL(file);

	}


}
