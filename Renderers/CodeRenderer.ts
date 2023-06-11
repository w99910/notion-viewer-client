import Renderable from "../interfaces/Renderable";
import {Block, Code} from "../types/block_types";
import {highlight, languages} from "prismjs";

import 'prismjs/components/prism-php.min';
import 'prismjs/components/prism-git.min';
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-mongodb.min';
import 'prismjs/components/prism-r.min';
import 'prismjs/components/prism-sql.min';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-go.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-markup-templating.min';

// import 'prismjs/themes/prism-solarizedlight.min.css'


export default class CodeRenderer implements Renderable {
    render(block: Block, level: number = 0,): string {
        let codes = `<div style="width: 100%;padding: 20px;border-radius: 4px; background: #f1f1f1"><code>`;
        block.code.rich_text.forEach((text) => {
            codes += `<p>${block.code.language === 'plain text' ? text.plain_text : highlight(text.plain_text, languages[block.code.language], block.code.language)}</p>`
        });
        codes += `</code></div>`;
        return codes;
    }

    type(): string {
        return "code";
    }
}
