# angular-wysiwyg-editor

## Install

This is a github repository containg a simple wysiwyg component module.

* You can simply git submodule add and import wysiwyg component module

```` sh
git submodule add https://github.com/thruthesky/angular-wysiwyg-editor src/app/modules/angular-wysiwyg-editor
````

* And add it to app module or any where.

```` typescript
import { EditorModule } from 'app/modules/angular-wysiwyg-editor/editor.module';
@NgModule({
  imports: [
    EditorModule
  ],
})
````

* Show like below.
  If [buttons] is omitted, then it shows all the possible butttons.

```` html
  <app-editor-component #editorComponent
    [buttons]="['bold', 'italic', 'unerline', 'fontsize', 'forecolor', 'backcolor', 'highlight', 'link', 'unink', 'table', 'formatblock', 'insertline', 'insertimage', 'orderedlist', 'unorderedlist', 'left', 'center', 'removeformat', 'strike', 'big', 'normal']"
  ></app-editor-component>
````

* And get the HTML content of the editor like below.

````
````


* See examples folder to get sample working code.
    You can delete sample folder if you don't want.