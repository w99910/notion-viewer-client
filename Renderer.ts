import {Block, RichText} from "./types/block_types";
import Renderable from "./interfaces/Renderable";
import ParagraphRenderer from "./Renderers/ParagraphRenderer";
import HeadingOneRenderer from "./Renderers/HeadingOneRenderer";
import HeadingTwoRenderer from "./Renderers/HeadingTwoRenderer";
import HeadingThreeRenderer from "./Renderers/HeadingThreeRenderer";
import ToDoRenderer from "./Renderers/ToDoRenderer";
import CallOutRenderer from "./Renderers/CallOutRenderer";
import CodeRenderer from "./Renderers/CodeRenderer";
import ImageRenderer from "./Renderers/ImageRenderer";
import BulletedListItemRenderer from "./Renderers/BulletedListItemRenderer";
import {Page} from "./types/page_type";
import ChildPageRenderer from "./Renderers/ChildPageRenderer";
import NumberedListItemRenderer from "./Renderers/NumberListItemRenderer";
import LinkPreviewRenderer from "./Renderers/LinkPreviewRenderer";
import ToggleRenderer from "./Renderers/ToggleRenderer";
import QuoteRenderer from "./Renderers/QuoteRenderer";
import DividerRenderer from "./Renderers/DividerRenderer";
import TableRenderer from "./Renderers/TableRenderer";
import TableRowRenderer from "./Renderers/TableRowRenderer";

export default class Renderer {
    protected static instance: Renderer;

    protected body: string = '';

    protected title: string = '';

    protected _containerElement: HTMLElement = null;

    protected afterRender: Array<((renderer: Renderer) => void)> = [];

    protected beforeRender: Array<((renderer: Renderer) => void)> = [];

    protected renderers: Renderable[] = [
        new ParagraphRenderer(),
        new BulletedListItemRenderer(),
        new CallOutRenderer(),
        new ChildPageRenderer(),
        new CodeRenderer(),
        new HeadingOneRenderer(),
        new HeadingTwoRenderer(),
        new HeadingThreeRenderer(),
        new ImageRenderer(),
        new ToDoRenderer(),
        new NumberedListItemRenderer(),
        new LinkPreviewRenderer(),
        new ToggleRenderer(),
        new QuoteRenderer(),
        new DividerRenderer(),
        new TableRenderer(),
        new TableRowRenderer()
    ];

    private constructor() {
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Renderer();
        }
        return this.instance;
    }

    static setContainerElement(element: HTMLElement) {
        let instance = this.getInstance();
        instance._containerElement = element;
    }

    get containerElement(): HTMLElement {
        return this._containerElement;
    }

    static addRenderer(renderer: Renderable) {
        let instance = this.getInstance();
        instance.renderers.push(renderer);
    }

    static getRenderer(block: Block): Renderable | null {
        let instance = this.getInstance();
        let render = instance.renderers.filter((renderer) => {
            return renderer.type() === block.type;
        });
        return render.length > 0 ? render[0] : null;
    }


    static setRenderers(renderers: Renderable[]) {
        let instance = this.getInstance();
        instance.renderers = renderers;
    }

    static parseTitle(page: Page) {
        return '<h1 style="font-size: 2.5rem; font-weight: 600;">' + page.properties.title.title[0].plain_text + '</h1>';
    }

    static parseRichText(richText: RichText) {
        let text = richText.plain_text;

        if (richText.annotations.bold) {
            text = `<strong>${text}</strong>`;
        }
        if (richText.annotations.strikethrough) {
            text = `<del>${text}</del>`;
        }

        if (richText.annotations.italic) {
            text = `<em>${text}</em>`;
        }

        if (richText.annotations.code) {
            text = `<code style="background: #f1f1f1; padding:2px; color:#fd7009">${text}</code>`;
        }

        if (richText.text.link) {
            text = `<a style="color:#3838ff" target="_blank" href="${richText.text.link.url}">${text}</a>`;
        }
        return text;
    }

    static parseBlocks(blocks: Block[], level: number = 0) {
        let instance = this.getInstance();
        let output = '';
        blocks.forEach((block) => {
            let blockRender = this.getRenderer(block);
            if (blockRender) {
                output += blockRender.render(block, level, instance._containerElement) + '\n';
            }
        })
        return output;
    }

    static onAfterRender(callback: (renderer: Renderer) => void) {
        let instance = this.getInstance();
        instance.afterRender.push(callback);
    };

    static onBeforeRender(callback: (renderer: Renderer) => void) {
        let instance = this.getInstance();
        instance.beforeRender.push(callback);
    };

    static render(page: Page, blocks: Block[], containerElement: HTMLElement) {
        let instance = this.getInstance();
        let output = '';
        instance.beforeRender.forEach((callback) => {
            callback(instance);
        });
        output += this.parseTitle(page);
        output += this.parseBlocks(blocks);
        this.setContainerElement(containerElement);
        containerElement.innerHTML = output;
        instance.afterRender.forEach((callback) => {
            callback(instance);
        });
        instance.renderers.forEach((renderer) => {
            if (renderer.afterRender) {
                renderer.afterRender(containerElement)
            }
        })
    }
}
