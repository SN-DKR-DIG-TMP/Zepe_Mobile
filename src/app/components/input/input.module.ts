import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [ InputComponent ],
    imports: [ CommonModule, IonicModule, ReactiveFormsModule ],
    exports: [ InputComponent ],
    providers: []
})
export class InputModule {

}