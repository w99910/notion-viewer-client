import {Block} from "../types/block_types";
import Renderable from "../interfaces/Renderable";

export default class DividerRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        return '<hr>';
    }

    type(): string {
        return "divider";
    }
}
