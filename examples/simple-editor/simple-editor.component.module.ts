import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { SimpleEditorComponent } from './simple-editor.component';
import { EditorModule } from '../../editor.module';

@NgModule({
    imports: [
        CommonModule,
        EditorModule
    ],
    exports: [
        SimpleEditorComponent
    ],
    declarations: [
        SimpleEditorComponent
    ],
    providers: [],
})
export class SimpleEditorComponentModule { }
