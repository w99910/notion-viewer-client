import Renderable from "../interfaces/Renderable";
import {Block} from "../types/block_types";
import Renderer from "../Renderer";

export default class TableRenderer implements Renderable {
    render(block: Block, level?: number, containerElement?: HTMLElement): string {
        let output = "<table style=''>";
        output += "<tr>";
        for (let i = 0; i < block.table.table_width; i++) {
            output += "<th'></th>";
        }
        output += "</tr>";
        if (block.has_children && block.children) {
            output += Renderer.parseBlocks(block.children, level);
        }
        output += '</table>';
        return output;
    }

    type(): string {
        return "table";
    }

}
