# angular-wysiwyg-editor

## Install

This is a github repository containg a simple wysiwyg component module.

* You can simply git submodule add and import wysiwyg component module

```` sh
git submodule add https://github.com/thruthesky/angular-wysiwyg-editor src/app/modules/angular-wysiwyg-editor
````

* And use like below

```` typescript
import { EditorModule } from 'app/modules/angular-wysiwyg-editor/editor.module';
@NgModule({
  imports: [
    EditorModule
  ],
})
````

* See examples folder to get sample working code.
