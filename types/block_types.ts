export type Paragraph = {
    rich_text: RichText[],
    color: string,
};

export type HeadingOne = {
    rich_text: RichText[],
    is_toggleable: boolean,
    color: string,
}

export type ToDo = {
    rich_text: RichText[],
    checked: boolean,
    color: string,
}

export type Table = {
    table_width: number,
    has_column_header: boolean,
    has_row_header: boolean
}

export type TableRow = {
    cells: Array<Array<RichText>>,
}

export type CallOut = {
    rich_text: RichText[],
    icon: {
        type: string,
        emoji: string
    },
    color: string,
}

export type Image = {
    caption: RichText[],
    type: "external" | "file",
    external?: {
        url: string
    }
    file?: {
        url: string,
        expiry_time: string,
    }
}

export type Code = {
    rich_text: RichText[],
    caption: string,
    language: string,
}

export type ChildPage = {
    title: string,
}

export type RichText = {
    type: string,
    text: {
        content: string,
        link: null | {
            url: string
        }
    },
    annotations: {
        bold: boolean,
        italic: boolean,
        strikethrough: boolean,
        underline: boolean,
        code: boolean,
        color: string
    },
    plain_text: string,
    href?: null | string
}

export type BulletedListItem = {
    rich_text: RichText[],
    color: string
}

export type NumberedListItem = {
    rich_text: RichText[],
    color: string
}

export type LinkPreview = {
    url: string,
}

export type Toggle = {
    rich_text: RichText[],
    color: string,
}

export type Quote = {
    rich_text: RichText[],
    color: string,
}

export type Block = {
    id: string,
    type: string,
    paragraph?: Paragraph,
    heading_1?: HeadingOne,
    heading_2?: HeadingOne,
    heading_3?: HeadingOne,
    to_do?: ToDo,
    callout?: CallOut,
    code?: Code,
    image?: Image,
    has_children: boolean,
    children?: Block[],
    bulleted_list_item?: BulletedListItem,
    child_page?: ChildPage,
    numbered_list_item?: NumberedListItem,
    link_preview?: LinkPreview,
    toggle?: Toggle,
    quote?: Quote,
    divider?: [],
    table?: Table,
    table_row?: TableRow,
}
