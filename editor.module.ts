import { NgModule } from '@angular/core';


import { EditorComponent } from './components/editor/editor.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        EditorComponent
    ],
    declarations: [
        EditorComponent
    ],
    providers: [],
})
export class EditorModule { }
