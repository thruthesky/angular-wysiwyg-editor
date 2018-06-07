import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, OnChanges, AfterViewInit } from '@angular/core';
type COMMAND = 'bold' | 'italic' | 'underline' | 'fontsize' | 'forecolor' | 'backcolor'
  | 'highlight' | 'link' | 'unlink' | 'table' | 'fontname' | 'formatblock' | 'indent' | 'outdent'
  | 'insertline' | 'insertimage' | 'orderedlist' | 'unorderedlist' | 'left' | 'center' | 'right'
  | 'removeformat' | 'strke' | 'big' | 'normal';
@Component({
  selector: 'app-editor-component',
  templateUrl: './editor.component.html',
  styles: [`
    .editor .content {
      padding: 8px;
      overflow: auto;
      border: 1px solid grey;
      height: 200px;
    }
    .editor .content[size="big"] { height: 600px; }

    .editor .buttons {
      margin-bottom: 8px;
    }
    .editor .buttons button {
      display: inline-block;
      margin-left: 2px;
      border: 0;
      border-radius: 2px;
      font-size: 8pt;
      background-color: #888;
      color: white;
      cursor: pointer;
    }
    .editor .buttons button:hover {
      background-color: #444;
    }
    .editor .buttons select {
      margin-left: 2px;
      border: 1px solid #888;
      border-radius: 2px;
      font-size: 8pt;
    }
  `]
})
export class EditorComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('editorContent') editorComponent: ElementRef;

  @ViewChild('tBold') tBold: ElementRef;
  @ViewChild('tItalic') tItalic: ElementRef;
  @ViewChild('tUnderline') tUnderline: ElementRef;
  @ViewChild('tStrike') tStrike: ElementRef;
  @ViewChild('tFontsize') tFontsize: ElementRef;
  @ViewChild('tForecolor') tForecolor: ElementRef;
  @ViewChild('tBackcolor') tBackcolor: ElementRef;
  @ViewChild('tHighlight') tHighlight: ElementRef;
  @ViewChild('tLink') tLink: ElementRef;
  @ViewChild('tUnlink') tUnlink: ElementRef;
  @ViewChild('tTable') tTable: ElementRef;
  @ViewChild('tFontname') tFontname: ElementRef;
  @ViewChild('tFormatblock') tFormatblock: ElementRef;
  @ViewChild('tIndent') tIndent: ElementRef;
  @ViewChild('tOutdent') tOutdent: ElementRef;
  @ViewChild('tInsertline') tInsertline: ElementRef;
  @ViewChild('tImage') tImage: ElementRef;
  @ViewChild('tOrderedlist') tOrderedlist: ElementRef;
  @ViewChild('tUnorderedlist') tUnorderedlist: ElementRef;
  @ViewChild('tLeft') tLeft: ElementRef;
  @ViewChild('tCenter') tCenter: ElementRef;
  @ViewChild('tRight') tRight: ElementRef;
  @ViewChild('tUnformat') tUnformat: ElementRef;
  @ViewChild('tBigview') tBigview: ElementRef;
  @ViewChild('tSmallview') tSmallview: ElementRef;

  @Input() init = {
    content: '',
    cursor: false
  };
  /**
   * default buttons.
   */
  @Input() buttons: Array<COMMAND> = null;

  nameButtons: { [name: string]: ElementRef } = {};
  containerButtons: Array<ElementRef> = [];

  contentSize: 'big' | 'normal' = 'normal';

  t = {
    strike: 'Strike',
    size: 'Size',
    forecolor: 'Color',
    backcolor: 'Background Color',
    highlight: 'Highlight',
    link: 'Link',
    unlink: 'Unlink',
    table: 'Table',
    fontname: 'Font Name',
    format: 'Format',
    indent: 'indent',
    outdent: 'outdent',
    image: 'Image',
    orderedlist: 'OL',
    unorderedlist: 'UL',
    left: 'Left',
    center: 'Center',
    right: 'Right',
    unformat: 'Unformat',
    bigView: '+',
    smallView: '-',
    line: 'Line',
    bold: 'B',
    italic: 'I',
    underline: 'U'
  };

  tKorean = {
    strike: '가운데줄',
    size: '글자크기',
    forecolor: '글자색',
    backcolor: '배경색',
    highlight: '강조표시',
    link: '링크',
    unlink: '링크해제',
    table: '테이블',
    fontname: '글자체',
    format: '포멧(헤더)',
    indent: '들여쓰기',
    outdent: '내어쓰기',
    image: '사진',
    orderedlist: '목록(점)',
    unorderedlist: '목록(번호)',
    left: '왼쪽',
    center: '중간',
    right: '오른쪽',
    unformat: '양식제거',
    bigView: '크게',
    smallView: '작게',
    line: '라인분리',
    bold: '굵게',
    italic: '기울기',
    underline: '밑줄'
  };

  constructor() {
    const ln = this.getBrowserLanguage();
    if (ln === 'ko') {
      this.t = this.tKorean;
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    setTimeout(() => this.resetButtons(), 100);
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

  resetButtons() {


    this.nameButtons['bold'] = this.tBold;
    this.nameButtons['italic'] = this.tItalic;
    this.nameButtons['underline'] = this.tUnderline;
    this.nameButtons['strike'] = this.tStrike;
    this.nameButtons['fontsize'] = this.tFontsize;
    this.nameButtons['forecolor'] = this.tForecolor;
    this.nameButtons['backcolor'] = this.tBackcolor;
    this.nameButtons['highlight'] = this.tHighlight;
    this.nameButtons['link'] = this.tLink;
    this.nameButtons['unlink'] = this.tUnlink;
    this.nameButtons['table'] = this.tTable;
    this.nameButtons['fontname'] = this.tFontname;
    this.nameButtons['formatblock'] = this.tFormatblock;
    this.nameButtons['indent'] = this.tIndent;
    this.nameButtons['outdent'] = this.tOutdent;
    this.nameButtons['insertline'] = this.tInsertline;
    this.nameButtons['insertimage'] = this.tImage;
    this.nameButtons['orderedlist'] = this.tOrderedlist;
    this.nameButtons['unorderedlist'] = this.tUnorderedlist;
    this.nameButtons['left'] = this.tLeft;
    this.nameButtons['center'] = this.tCenter;
    this.nameButtons['right'] = this.tRight;
    this.nameButtons['removeformat'] = this.tUnformat;
    this.nameButtons['big'] = this.tBigview;
    this.nameButtons['normal'] = this.tSmallview;


    // const keys: Array<COMMAND> = <any>Object.keys(this.buttons);
    // console.log('keys: ', keys);
    for (const k of this.buttons) {
      if (this.is(k)) {
        this.containerButtons.push( this.nameButtons[k]);
      }
    }

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
  /**
   * exp 에 해당하는 Element 를 삭제한다.
   * 편집기의 내용 중에서 삭제하고 싶은 것이 있으면 이 메소드를 사용하면 된다.
   *
   * @example
   *      this.editorComponent.removeContent(`img[idx="${idx}"]`);
   *
   * @param querySelector() 에 들어가는 표현. 이 표현으로 삭제할 항목(HTML Element)을 매치한다.
   */
  removeContent(exp) {
    if (!exp) {
      return;
    }
    const container = this.editorComponent.nativeElement;
    const match = container.querySelector(exp);
    if (!match) {
      return;
    }
    container.removeChild(match);
    this.putContent(container.innerHTML);
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
    console.log('link: ', link);
    if (link) {
      this.execCommand('createLink', false, link);
    }
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

  /**
   * 이미지를 추가 할 때, style 을 같이 추가해야 하기 때문에, insertHTML 로 한다.
   * @param src Image src
   * @param name Image name
   */
  insertImage(src?, name?, idx?) {
    if (!src) {
      src = prompt('Enter a link', 'http://');
    }
    if (!this.getCaret()) {
      this.setEndOfContenteditable();
    }
    const tag = `<IMG class="editor-image" SRC="${src}" ALT="${name}" idx="${idx}" style="max-width: 100%;"><BR>Image: ${name}<BR>`;
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


  /**
   * Returns browser language
   *
   * @param full If it is true, then it returns the full language string like 'en-US'.
   *              Otherwise, it returns the first two letters like 'en'.
   *
   * @returns
   *      - the browser language like 'en', 'en-US', 'ko', 'ko-KR'
   *      - null if it cannot detect a language.
   */
  private getBrowserLanguage(full = false): string {
    const nav = window.navigator;
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    let ln: string = null;
    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (let i = 0; i < nav.languages.length; i++) {
        const language = nav.languages[i];
        if (language && language.length) {
          ln = language;
          break;
        }
      }
    }

    // support for other well known properties in browsers
    for (let i = 0; i < browserLanguagePropertyKeys.length; i++) {
      const language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        ln = language;
        break;
      }
    }

    if (ln) {
      if (full === false) {
        ln = ln.substring(0, 2);
      }
    }

    return ln;
  }

}

