import Renderable from "../interfaces/Renderable";
import {Block, Image} from "../types/block_types";

export default class ImageRenderer implements Renderable {
    caption(image: Image): string {
        if (image.caption.length > 0) {
            return image.caption[0].plain_text;
        }
        return null;
    }

    url(image: Image): string {
        if (image.type == 'external') {
            return image.external.url;
        }
        return image.file.url;
    }

    render(block: Block, level: number = 0,): string {
        let output = `<img src="${this.url(block.image)}" alt="${this.caption(block.image)}" style="width: 100%; border-radius: 4px;">`;
        let caption = this.caption(block.image);
        if (caption) {
            output += `<span style="margin-top: 2px; color:gray; font-size: 14px">${caption}</span>`
        }
        return output;
    }

    type(): string {
        return "image";
    }
}
