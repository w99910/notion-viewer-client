import Renderable from "../interfaces/Renderable";
import {Block} from "../types/block_types";
import Renderer from "../Renderer";

export default class ToggleRenderer implements Renderable {
    render(block: Block, level?: number, containerElement?: HTMLElement): string {
        let output = `<details class="toggle-container"><summary class="toggle-title">`;
        block.toggle.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text);
        })
        output += `</summary>`;
        if (block.has_children && block.children) {
            level++;
            output += `<div style="margin-left: 20px; display: flex; row-gap: 4px; flex-direction: column">${Renderer.parseBlocks(block.children, level)}</div>`;
        }
        output += `</details>`;
        return output;
    }

    type(): string {
        return "toggle";
    }

}