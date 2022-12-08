import Renderable from "../interfaces/Renderable";
import {Block, Code, ToDo} from "../types/block_types";
import {highlight, languages} from "prismjs";
import Renderer from "../Renderer";

export default class ToDoRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        let output = `<div style="display: flex"><input style="margin-right:10px; margin-top:5px;" type="checkbox" disabled ${block.to_do.checked ? 'checked' : 'false'}/>`;
        output += `<div style="display: flex; flex-direction: column; row-gap: 6px;"><div>`
        block.to_do.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text)
        });
        output += `</div>`;
        if (block.has_children && block.children) {
            output += Renderer.parseBlocks(block.children, level + 1);
        }
        output += '</div></div>';
        return output;
    }

    type(): string {
        return "to_do";
    }
}
