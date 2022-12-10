import Renderable from "../interfaces/Renderable";
import {Block, Code, Paragraph} from "../types/block_types";
import BaseRenderer from "../Renderer";

export default class ParagraphRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        let output = `<div style="color:${block.paragraph.color === 'default' ? 'auto' : 'light' + block.paragraph.color}" class="paragraph">`;
        block.paragraph.rich_text.forEach((text) => {
            output += BaseRenderer.parseRichText(text)
        });
        output += '</div>'
        return output;
    }

    type(): string {
        return "paragraph";
    }
}
