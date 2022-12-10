import Renderable from "../interfaces/Renderable";
import {Block, CallOut, Paragraph} from "../types/block_types";
import Renderer from "../Renderer";

export default class CallOutRenderer implements Renderable {

    render(block: Block, level: number = 0,): string {
        let output = `<div style="display: flex; border-radius: 4px; column-gap:12px; padding: 20px; color:rgb(255,255,255); mix-blend-mode: difference; background:${block.callout.color === 'default' ? '#f1f1f1' : 'light' + block.callout.color.split('_')[0]}">`;
        output += `<span class="emoji">${block.callout.icon.emoji}</span>`;
        block.callout.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text)
        });
        output += '</div>';
        return output;
    }

    type(): string {
        return "callout";
    }
}
