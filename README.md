# Notion Viewer Client

- A simple and easy to use package for rendering notion pages in your laravel application.
- This package also offers you a renderer out of the box. You can use it to render your notion pages on your own.
- You can add or remove the default renderers and use your own renderer too.

## Table of Contents

- [How it works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
    - [NotionViewer](#notionviewer)
    - [Renderer](#renderer)
- [Supported Notion Block Types](#notion-block-types)
- [Customizing Renderers](#addingremoving-renderers)
- [License](#license)

# How it works

Since notion api doesn't support CORS and don't recommend making API calls from a webpage
(see [here](https://github.com/makenotion/notion-sdk-js/issues/96)), you may need to
install <a href="https://github.com/w99910/laravel-notion-viewer">laravel-notion-viewer</a> composer package in order to
get notion blocks from Notion Api.

But you can also use your own server to get the blocks from Notion Api and pass the blocks to the `Renderer` class in
your client.
---

# Installation

Install via npm

```bash
npm install notion-viewer-client
```

# Usage

- ## NotionViewer

```text
NotionViewer.render(id: string, element: HTMLElement, endPoint?: string)
```

Using `axios`, XHR request will be sent to `endPoint` to get the blocks from Notion Api and then render the blocks
in `element`.

By default, the `endPoint` is `/laravel-notion-viewer/data/{id}` which is a route offered
by <a href="https://github.com/w99910/laravel-notion-viewer">laravel-notion-viewer</a>.

You can specify your own endpoint to get the blocks from your own server.

#### Example Usage:

```typescript
import NotionViewer from 'notion-viewer-client';

let notionPageId = 'this-is-a-notion-page-id'; // If you don't know how to get id, see https://github.com/w99910/laravel-notion-viewer/README.md#how-to-get-notion-page-id

document.addEventListener('DOMContentLoaded', async () => {
    await NotionViewer.render(notionPageId, document.querySelector('#index'))
});
```

By specifying the `endPoint`:

```typescript
await NotionViewer.render(notionPageId, document.querySelector('#index'), 'your-end-point')
```

- ## Renderer

You can also parse blocks on your own using `Renderer` class.

- #### Render a notion html page with page, blocks, and parent element.

```typescript
import Renderer from "notion-viewer-client/Renderer";

Renderer.renderPage(page, blocks, element)
```

- #### Parse blocks to html

```typescript
import Renderer from "notion-viewer-client/Renderer";

let output = Renderer.parseBlocks(blocks)
console.log(output);
```

- #### Parse rich text to html

```typescript
import Renderer from "notion-viewer-client/Renderer";

let output = Renderer.parseRichText(richText);
console.log(output);
```

- #### Get a renderer of a block

```typescript
import Renderer from "notion-viewer-client/Renderer";

let renderer = Renderer.getRenderer(block);
```

- #### Callback before renderer

```typescript
import Renderer from "notion-viewer-client/Renderer";

Renderer.onBeforeRender((renderer) => {
    console.log('Called before render');
})
```

- #### Callback after renderer

```typescript
import Renderer from "notion-viewer-client/Renderer";

Renderer.onAfterRender((renderer) => {
    console.log('Called after render');
})
```

## Notion block types

The following are the block types supported by this package for now:

- paragraph
- heading_1
- heading_2
- heading_3
- to_do
- callout
- code
- image
- has_children
- children
- bulleted_list_item
- child_page
- numbered_list_item
- link_preview
- toggle
- quote
- divider
- table
- table_row

## Adding/Removing Renderers

- Creating a compatible renderer
    - Create a new class and implements `Renderable` interface.

```typescript
import Renderable from 'notion-viewer-client/interfaces/Renderable';

class YourCustomRenderer implements Renderable {

    render(block: Block, level?: number, containerElement?: HTMLElement): string {
        // Your code here
    }

    type() {
        return 'your_block_type';
    }

    // optional event hooks
    beforeRender(containerElement?: HTMLElement) {
    };

    afterRender(containerElement?: HTMLElement) {
    };
}
```

- Adding a renderer:

```typescript
import Renderer from "notion-viewer-client/Renderer";

Renderer.addRenderer(new YourCustomRenderer())
```

- Removing a default renderer:

```typescript
import Renderer from "notion-viewer-client/Renderer";

Renderer.removeRenderer('block_type')
```

- Replacing\Removing all default renderers:

```typescript
import Renderer from "notion-viewer-client/Renderer";

// Replacing renderers with your custom renders
Renderer.setRenderers([
    new YourCustomRenderer(),
    new YourAnotherCustomRenderer()
])
// Removing all renderers
Renderer.setRenderers([]);
```

## LICENSE

- MIT

## Support Me

[Buy me a coffee](https://www.buymeacoffee.com/zawlintun) if you like my work.

## TODO

- [ ] Add more renderers
- [ ] Add tests
