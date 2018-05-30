import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorComponent } from '../../components/editor/editor.component';

@Component({
    selector: 'app-simple-editor-component',
    templateUrl: 'simple-editor.component.html',
    styleUrls: ['simple-editor.component.css']
})
export class SimpleEditorComponent implements OnInit {
    @ViewChild('editorComponent') editorComponent: EditorComponent;
    html = '';
    constructor() { }

    ngOnInit() { }
    onSubmit() {
        this.html = this.editorComponent.getContent();
    }
}



