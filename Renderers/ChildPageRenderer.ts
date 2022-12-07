import Renderable from "../interfaces/Renderable";
import {Block} from "../types/block_types";
import Renderer from "../Renderer";

export default class ChildPageRenderer implements Renderable {
    render(block: Block, level: number = 0, containerElement: HTMLElement): string {
        return `<button class="child-page-renderer" data-block-id="${block.id}" style="color:#ff3030; text-decoration: underline; align-self: start;">${block.child_page.title}</button>`;
    }

    type(): string {
        return "child_page";
    }
}
