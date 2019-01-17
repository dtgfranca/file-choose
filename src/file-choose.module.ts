import { NgModule, ModuleWithProviders } from '@angular/core';
import { FileChooseComponent } from './components/file-choose.component';
import { IonicModule } from 'ionic-angular';
 
@NgModule({
    imports: [
        // Only if you use elements like ion-content, ion-xyz...
        IonicModule
    ],
    declarations: [
        // declare all components that your module uses
        FileChooseComponent
    ],
    exports: [
        // export the component(s) that you want others to be able to use
        FileChooseComponent
    ]
})
export class FileChooseModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FileChooseModule
            
        };
    }
}