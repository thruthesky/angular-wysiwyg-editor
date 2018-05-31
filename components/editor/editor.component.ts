import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, OnChanges, AfterViewInit } from '@angular/core';
type COMMAND = 'bold' | 'italic' | 'underline' | 'fontsize' | 'forecolor' | 'backcolor'
  | 'highlight' | 'link' | 'unlink' | 'table' | 'fontname' | 'formatblock' | 'indent' | 'outdent'
  | 'insertline' | 'insertimage' | 'orderedlist' | 'unorderedlist' | 'left' | 'center' | 'right'
  | 'removeformat' | 'strke' | 'big' | 'normal';
@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  styles: [`
    .content {
      overflow: auto;
      border: 1px solid grey;
      height: 200px;
    }
    .content[size="big"] { height: 600px; }
  `]
})
export class EditorComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('editorContent') editorComponent: ElementRef;

  @Input() init = {
    content: '',
    cursor: false
  };
  /**
   * default buttons.
   */
  @Input() buttons: Array<COMMAND> = null;
  contentSize: 'big' | 'normal' = 'normal';
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {
    console.log('EditorComponent::ngAfterViewInit() ', this.init);
    if (this.init.content) {
      this.putContent(this.init.content);
    }

    setTimeout(() => {
      if (this.init.cursor) {
        this.setEndOfContenteditable();
      }
    }, 100);

    // setInterval(() => {

    //   console.log('caret: ', this.getCaret(this.editorComponent.nativeElement));
    // }, 1000);


  }
  /**
   * 커서를 에디터 맨 마지막에 놓는다.
   *
   * 소스코드를 https://gist.github.com/al3x-edge/1010364 에서 가져왔다.
   *
   */
  setEndOfContenteditable() {
    const contentEditableElement = this.editorComponent.nativeElement;
    let range, selection;
    // Firefox, Chrome, Opera, Safari, IE 9+
    if (document.createRange) {
      range = document.createRange(); // Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); // get the selection object (allows you to change selection)
      selection.removeAllRanges(); // remove any selections already made
      selection.addRange(range); // make the range you have just created the visible selection
    } else if (document['selection']) {
      // IE 8 and lower
      range = document.body['createTextRange'](); // Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
      range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
      range.select(); // Select the range (make it the visible selection
    }
  }


  /**
   * 에디터의 커서 위치를 찾는다.
   * 에디터에 커서가 위치하지 않았으면 0을 리턴한다.
   * 주의. 커서가 에디터에 있는지 없는지만 판별해서, 커서가 에디터에 없으면, 커서를 추가하는 것만 한다. (이미지 추가 등에 필요)
   */
  getCaret() {
    const element = this.editorComponent.nativeElement;
    let caretOffset = 0;
    if (typeof window.getSelection !== 'undefined') {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    } else if (typeof document['selection'] !== 'undefined' && document['selection'].type !== 'Control') {
      const textRange = document['selection'].createRange();
      const preCaretTextRange = document.body['createTextRange']();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;

  }


  getContent(): string {
    return this.editorComponent.nativeElement.innerHTML;
  }
  putContent(html: string) {
    this.editorComponent.nativeElement.innerHTML = html;
  }
  private is(buttonName: COMMAND) {
    if (this.buttons === null) {
      return true;
    }
    // console.log(buttonName);
    // console.log(this.buttons);
    const re = this.buttons.includes(buttonName);
    // console.log('re: ', re);
    return re;
  }
  @HostListener('input', ['$event.target']) onContentChange(target: Element) {
    if (target && target.className && target.className === 'content') {
      // console.log('html: ', this.editorComponent.nativeElement.innerHTML);
    }
  }

  private execCommand(commandName: string, ui = false, value?: any): boolean {
    return document.execCommand(commandName, ui, value);
  }

  private bold(event: Event) {
    this.execCommand('bold');
    // const button = <HTMLButtonElement>event.target;
    // document.execCommand('bold', false, null);
  }
  private italic(event: Event) {
    this.execCommand('italic');
  }
  private underline(event: Event) {
    this.execCommand('underline');
  }
  private fontSize(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    this.execCommand('fontSize', false, value);
    target['value'] = '0';
  }
  private forecolor(event: Event) {
    const target = <Element>event.target;
    this.execCommand('forecolor', false, target['value']);
    target['value'] = '';
  }
  private backcolor(event: Event) {
    const target = <Element>event.target;
    this.execCommand('backcolor', false, target['value']);
    target['value'] = '';
  }
  private highlight(event: Event) {
    const target = <Element>event.target;
    const value = target['value'] + '';
    const backColor = value.split(',').shift();
    const foreColor = value.split(',').pop();
    this.execCommand('backColor', false, backColor);
    this.execCommand('foreColor', false, foreColor);
  }
  private link() {
    const link = prompt('Enter a link', 'http://');
    this.execCommand('createLink', false, link);
  }
  private unlink() {
    this.execCommand('unlink', false, null);
  }
  private table(event: Event) {
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
  private fontName(event: Event) {
    const target = <Element>event.target;
    this.execCommand('fontName', false, target['value']);
    target['value'] = '';
  }
  private formatBlock(event: Event) {
    const target = <Element>event.target;
    this.execCommand('formatBlock', false, target['value']);
    target['value'] = '';
  }

  private indent() {
    this.execCommand('indent', false, null);
  }

  private outdent() {
    this.execCommand('outdent', false, null);
  }
  private insertHorizontalRule() {
    this.execCommand('insertHorizontalRule', false, null);
  }

  insertImage(src?, name?) {
    if (!src) {
      src = prompt('Enter a link', 'http://');
    }
    if ( ! this.getCaret() ) {
      this.setEndOfContenteditable();
    }
    const tag = `<IMG class="editor-image" SRC="${src}" ALT="${name}" style="max-width: 100%;"><BR>Image: ${name}<BR>`;
    this.execCommand('insertHTML', false, tag);
    this.setEndOfContenteditable();
    // this.execCommand('insertImage', false, src);
  }
  private bigContentSize() {
    this.contentSize = 'big';
  }
  private originalContentSize() {
    this.contentSize = 'normal';
  }

  private insertOrderedList(event: Event) {
    const target = <Element>event.target;
    this.execCommand('insertOrderedList', false, null);
  }
  private insertUnorderedList(event: Event) {
    const target = <Element>event.target;
    this.execCommand('insertUnorderedList', false, null);
  }

  private justifyLeft(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyLeft', false, null);
  }
  private justifyCenter(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyCenter', false, null);
  }
  private justifyRight(event: Event) {
    const target = <Element>event.target;
    this.execCommand('justifyRight', false, null);
  }
  private removeFormat(event: Event) {
    const target = <Element>event.target;
    this.execCommand('removeFormat', false, null);
  }
  private strikeThrough(event: Event) {
    const target = <Element>event.target;
    this.execCommand('strikeThrough', false, null);
  }

}

