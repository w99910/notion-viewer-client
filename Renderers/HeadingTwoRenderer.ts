import Renderable from "../interfaces/Renderable";
import {Block, HeadingOne} from "../types/block_types";
import Renderer from "../Renderer";

export default class HeadingTwoRenderer implements Renderable {

    render(block: Block, level: number = 0,): string {
        let output = '<h2 style="font-size: 1.5rem; font-weight: 600;">';
        block.heading_2.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text);
        });
        output += '</h2>';
        return output;
    }

    type(): string {
        return "heading_2";
    }
}
