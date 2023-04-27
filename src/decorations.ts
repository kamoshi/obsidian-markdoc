import { RangeSetBuilder } from "@codemirror/state";
import {
  DecorationSet,
  ViewUpdate,
  PluginValue,
  EditorView,
  ViewPlugin,
  Decoration,
  PluginSpec
} from "@codemirror/view";


const MARKDOC_BLOCK = /{% \/?[0-9a-zA-Z()$]+ \/?%}/g;


class MarkdocPlugin implements PluginValue {
  decorations: DecorationSet;

  constructor(view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  destroy() {}

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    view.visibleRanges

    for (const {from, to} of view.visibleRanges) {
      for (let pos = from; pos <= to;) {
        const line = view.state.doc.lineAt(pos);

        // Find all matches positions
        MARKDOC_BLOCK.lastIndex = 0;
        while (true) {
          const match = MARKDOC_BLOCK.exec(line.text);
          if (!match) break;

          const from = pos + match.index;
          const to = pos + match.index + match[0].length;
          builder.add(from, to, Decoration.mark({ class: "markdoc-block" }));
        }

        pos = line.to + 1;
      }
      
    }

    return builder.finish();
  }
}

const pluginSpec: PluginSpec<MarkdocPlugin> = {
  decorations: (value: MarkdocPlugin) => value.decorations,
};

export const markdoc = ViewPlugin.fromClass(MarkdocPlugin, pluginSpec);
