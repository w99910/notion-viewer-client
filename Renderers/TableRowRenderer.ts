import Renderable from "../interfaces/Renderable";
import {Block} from "../types/block_types";
import Renderer from "../Renderer";

export default class TableRowRenderer implements Renderable {
    render(block: Block, level?: number, containerElement?: HTMLElement): string {
        let output = "<tr>";
        block.table_row.cells.forEach((cell) => {
            output += `<td style="border: 0.5px solid rgb(190,190,190); padding: 6px">`;
            cell.forEach((text) => {
                output += Renderer.parseRichText(text);
            });
            output += `</td>`;
        });
        output += "</tr>";
        return output;
    }

    type(): string {
        return "table_row";
    }

}
