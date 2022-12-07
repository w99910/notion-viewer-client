import Renderable from "../interfaces/Renderable";
import {Block} from "../types/block_types";
import Renderer from "../Renderer";

export default class QuoteRenderer implements Renderable {
    render(block: Block, level?: number, containerElement?: HTMLElement): string {
        let output = `<blockquote style="position: relative; padding: 6px 12px;">`;
        output += `<div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background-color: ${block.quote.color === 'default' ? 'black' : block.quote.color};"></div>`;
        block.quote.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text);
        })
        output += `</blockquote>`;
        return output;
    }

    type(): string {
        return "quote";
    }
}
