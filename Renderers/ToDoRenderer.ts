import Renderable from "../interfaces/Renderable";
import {Block, Code, ToDo} from "../types/block_types";
import {highlight, languages} from "prismjs";
import BaseRenderer from "../Renderer";

export default class ToDoRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        let output = `<div style="display: flex; column-gap:10px; align-items: center"><input type="checkbox" disabled ${block.to_do.checked ? 'checked' : 'false'}/>`;
        block.to_do.rich_text.forEach((text) => {
            output += BaseRenderer.parseRichText(text)
        });
        output += '</div>';
        return output;
    }

    type(): string {
        return "to_do";
    }
}
