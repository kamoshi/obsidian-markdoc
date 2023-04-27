import { Plugin } from 'obsidian';
import { markdoc } from './decorations';


export default class MarkdocPlugin extends Plugin {

  async onload() {
    this.registerExtensions(["mdoc"], "markdown");
    this.registerEditorExtension(markdoc);
  }

}
