import { Plugin } from 'obsidian';


export default class MyPlugin extends Plugin {

	async onload() {
		this.registerExtensions(["mdoc"], "markdown");
	}
	
}
