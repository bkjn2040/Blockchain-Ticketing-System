import { readDb, writeDb } from "./dbPrimitiveOp"
import { v4 as uuidv4 } from "uuid";

interface Record {
    uuid: string;
}

export class Collection {
    private db_name: string;

    constructor(name: string) {
        this.db_name = name;
    }

    public INSERT(obj: Object) {
        const current: Object[] = readDb(this.db_name + ".json");

        const o: Object & Record = {
            ...obj,
            uuid: uuidv4()
        };
        current.push(o);

        writeDb(current, this.db_name + ".json")

        return o;
    }

    public QUERY(obj: Object): Object | null {
        const current: Object[] = readDb(this.db_name + ".json");
        const query = current.find((o) => {
            let key : keyof typeof obj;
            for (key in obj) {
                if (obj[key] != o[key])
                    return false;
            }

            return true;
        });

        if (!query)
            return null;

        return query;
    }

    public QUERY_ALL(obj: Object): Object | null {
        const current: Object[] = readDb(this.db_name + ".json");
        const query = current.filter((o) => {
            let key : keyof typeof obj;
            for (key in obj) {
                if (obj[key] != o[key])
                    return false;
            }

            return true;
        });

        if (!query)
            return null;

        return query;
    }

    public DELETE_ALL(obj: Object) {
        const current: Object[] = readDb(this.db_name + ".json");
        const modified = current.filter((o) => {
            let key : keyof typeof obj;
            for (key in obj) {
                if (obj[key] != o[key])
                    return true;
            }

            return false;
        });

        writeDb(modified, this.db_name + ".json");

        return modified;
    }
}