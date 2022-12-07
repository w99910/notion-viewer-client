import axios from "axios";
import Renderer from "./Renderer";

export default class NotionViewer {
    static async render(id: string, element: HTMLElement) {
        await axios.post(`/laravel-notion-viewer/data/${id}`).then((response) => {
            Renderer.onAfterRender((renderer) => {
                renderer.containerElement.querySelectorAll('.child-page-renderer').forEach((button) => {
                    button.addEventListener('click', () => {
                        NotionViewer.render(button.getAttribute('data-block-id'), renderer.containerElement);
                    });
                });
            });
            Renderer.render(response.data.page, response.data.blocks, element);
        })
    }
}
