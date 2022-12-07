import {Block, BulletedListItem} from "../types/block_types";
import Renderer from "../Renderer";
import Renderable from "../interfaces/Renderable";

export default class NumberedListItemRenderer implements Renderable {
    listStyles() {
        return ['disc', 'circle', 'square']
    }

    render(block: Block, level: number = 0,): string {
        let output = `<ul style="list-style:decimal"><li>`;
        block.numbered_list_item.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text);
        });
        output += '</li>'
        if (block.has_children && block.children && block.children.length > 0) {
            level++;
            output += `<div style="padding-left: ${level * 20}px;">${Renderer.parseBlocks(block.children, level)}</div>`;
        }
        output += '</ul>';
        return output;
    }

    type(): string {
        return "numbered_list_item";
    }
}
