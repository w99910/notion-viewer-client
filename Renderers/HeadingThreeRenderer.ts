import Renderable from "../interfaces/Renderable";
import {Block, HeadingOne} from "../types/block_types";
import Renderer from "../Renderer";

export default class HeadingThreeRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        let output = '<h3 style="font-size: 1.2rem; font-weight: 600;">';
        block.heading_3.rich_text.forEach((text) => {
            output += Renderer.parseRichText(text);
        });
        output += '</h3>';
        return output;
    }

    type(): string {
        return "heading_3";
    }

}
