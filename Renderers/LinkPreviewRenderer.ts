// link_preview

import Renderable from "../interfaces/Renderable";
import {Block} from "../types/block_types";
import axios from 'axios';

type linkPreview = {
    title: string | null,
    description: string | null,
    icon: string | null,
    url: string | null,
    maskIcon: string | null,
}

export default class LinkPreviewRenderer implements Renderable {
    render(block: Block, level?: number, containerElement?: HTMLElement): string {
        return `<div data-block-id='${block.id}' data-url="${block.link_preview.url}" class="link-preview"></div>`;
    }

    type(): string {
        return "link_preview";
    }

    afterRender(containerElement?: HTMLElement) {
        containerElement.querySelectorAll('.link-preview').forEach(async (linkPreview) => {
            if (!linkPreview.hasAttribute('rendered')) {
                axios.post('/laravel-notion-viewer/link-preview?url=' + encodeURIComponent(linkPreview.getAttribute('data-url')))
                    .then((r) => {
                        linkPreview.innerHTML = this.renderPreview(r.data);
                        linkPreview.setAttribute('rendered', null);
                    });
            }
        })
    }

    renderPreview(preview: linkPreview) {
        return `
            <a href="${preview.url}" target="_blank" style="display:flex; align-items: center; border-radius: 4px; background: #ededed; padding:6px 10px;">
                <img alt="${preview.title}" style="width: 30px;height: 30px;" src="${preview.maskIcon ?? preview.icon}">
                <div style="display: flex; flex-direction: column; margin-left: 12px; row-gap: 4px;">
                    <h2 style="font-weight: 600; font-size: 1rem">${preview.title}</h2>
                    <p style="color:#626262;font-size: 0.8rem">${preview.description}</p>
                </div>
            </a>`;
    }
}
