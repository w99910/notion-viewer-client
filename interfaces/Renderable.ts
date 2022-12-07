import {Block} from "../types/block_types";

export default interface Renderable {
    render(block: Block, level?: number, containerElement?: HTMLElement): string;

    type(): string;

    beforeRender?(containerElement?: HTMLElement);

    afterRender?(containerElement?: HTMLElement);
}
