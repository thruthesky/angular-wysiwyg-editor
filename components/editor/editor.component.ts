import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  styles: [`
    .content {
      border: 1px solid grey;
      height: 200px;
    }
    .content[size="big"] { height: 600px; }
  `]
})
export class EditorComponent implements OnInit {

  @ViewChild('editorContent') editorComponent: ElementRef;

  /**
   * default buttons.
   */
  @Input() buttons = ['bold', 'underline'];
  contentSize: 'big' | 'normal' = 'normal';
  constructor() { }

  ngOnInit() {
  }

  getContent(): string {
    return this.editorComponent.nativeElement.innerHTML;
  }
  @HostListener('input', ['$event.target']) onContentChange(target: Element) {
    if (target && target.className && target.className === 'content') {
      // console.log('html: ', this.editorComponent.nativeElement.innerHTML);
    }
  }

  execCommand(commandName: string, ui = false, value?: any): boolean {
    return document.execCommand(commandName, ui, value);
  }

  bold(event: Event) {
    this.execCommand('bold');
    // const button = <HTMLButtonElement>event.target;
    // document.execCommand('bold', false, null);
  }
  italic(event: Event) {
    this.execCommand('italic');
  }
  underline(event: Event) {
    this.execCommand('underline');
  }
  fontsize(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    this.execCommand('fontSize', false, value);
    target['value'] = '0';
  }
  fontcolor(event: Event) {
    const target = <Element>event.target;
    this.execCommand('forecolor', false, target['value']);
    target['value'] = '';
  }
  backcolor(event: Event) {
    const target = <Element>event.target;
    this.execCommand('backcolor', false, target['value']);
    target['value'] = '';
  }
  highlight(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    const backColor = value.split(',').shift();
    const foreColor = value.split(',').pop();
    this.execCommand('backColor', false, backColor);
    this.execCommand('foreColor', false, foreColor);
  }
  link() {
    const link = prompt('Enter a link', 'http://');
    this.execCommand('createLink', false, link);
  }
  unlink() {
    this.execCommand('unlink', false, null);
  }
  table(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    const rows = parseInt(value.split('x').shift(), 10);
    const cols = parseInt(value.split('x').pop(), 10);
    let tag = `<TABLE border="1">`;
    for (let i = 1; i <= rows; i++) {
      tag += '<TR>';
      for (let j = 1; j <= cols; j++) {
        tag += `<TD>${i}x${j}</TD>`;
      }
      tag += '</TR>';
    }
    tag += '</TABLE>';
    this.execCommand('insertHTML', false, tag);
    target['value'] = '';
  }
  fontName(event: Event) {
    const target = <Element>event.target;
    this.execCommand('fontName', false, target['value']);
    target['value'] = '';
  }
  formatBlock(event: Event) {
    const target = <Element>event.target;
    this.execCommand('formatBlock', false, target['value']);
    target['value'] = '';
  }

  indent() {
    this.execCommand('indent', false, null);
  }

  outdent() {
    this.execCommand('outdent', false, null);
  }
  insertHorizontalRule() {
    this.execCommand('insertHorizontalRule', false, null);
  }

  insertImage() {
    const link = prompt('Enter a link', 'http://');
    this.execCommand('insertImage', false, link);
  }
  bigContentSize() {
    this.contentSize = 'big';
  }
  originalContentSize() {
    this.contentSize = 'normal';
  }

  insertOrderedList(event: Event) {
    const target = <Element>event.target;
    this.execCommand('insertOrderedList', false, null);
  }
  insertUnorderedList(event: Event) {
    const target = <Element>event.target;
    this.execCommand('insertUnorderedList', false, null);
  }

  justifyLeft(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyLeft', false, null);
  }
  justifyCenter(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyCenter', false, null);
  }
  justifyRight(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyRight', false, null);
  }
  removeFormat(event: Event) {
    const target = <Element>event.target;
    this.execCommand('removeFormat', false, null);
  }
  strikeThrough(event: Event) {
    const target = <Element>event.target;
    this.execCommand('strikeThrough', false, null);
  }


}

