import Renderable from "../interfaces/Renderable";
import {Block, CallOut, Paragraph} from "../types/block_types";
import BaseRenderer from "../Renderer";

export default class CallOutRenderer implements Renderable {

    render(block: Block, level: number = 0,): string {
        let output = '<div style="display: flex; border-radius: 4px; column-gap:12px; padding: 20px; background:#f1f1f1">';
        output += `<span class="emoji">${block.callout.icon.emoji}</span>`;
        block.callout.rich_text.forEach((text) => {
            output += BaseRenderer.parseRichText(text)
        });
        output += '</div>';
        return output;
    }

    type(): string {
        return "callout";
    }
}
