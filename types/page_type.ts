import {RichText} from "./block_types";

export type Page = {
    "object": "page",
    "id": string,
    "created_time": string,
    "last_edited_time": string,
    "created_by": {
        "object": string,
        "id": string
    },
    "last_edited_by": {
        object: string,
        id: string
    },
    "cover": string | null,
    "icon": string | null,
    "parent": {
        "type": string,
        "page_id": string
    },
    "archived": boolean,
    "properties": {
        "title": {
            "id": string,
            "type": string,
            "title": RichText[]
        }
    },
    "url": string
}
