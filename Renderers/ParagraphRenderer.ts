import Renderable from "../interfaces/Renderable";
import {Block, Code, Paragraph} from "../types/block_types";
import BaseRenderer from "../Renderer";

export default class ParagraphRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        let output = '<p>';
        block.paragraph.rich_text.forEach((text) => {
            output += BaseRenderer.parseRichText(text)
        });
        output += '</p>'
        return output;
    }

    type(): string {
        return "paragraph";
    }
}
