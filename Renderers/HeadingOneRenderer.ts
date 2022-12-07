import Renderable from "../interfaces/Renderable";
import {Block, HeadingOne} from "../types/block_types";
import Renderer from "../Renderer";

export default class HeadingOneRenderer implements Renderable {

    render(block: Block, level: number = 0,): string {
        let output = '<h1 style="font-size: 2rem; font-weight: 600;">';
        block.heading_1.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text);
        });
        output += '</h1>';
        return output;
    }

    type(): string {
        return "heading_1";
    }

}
