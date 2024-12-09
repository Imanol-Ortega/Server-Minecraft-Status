
export interface APIMC {
    online:       boolean;
    host:         string;
    port:         number;
    ip_address:   string;
    eula_blocked: boolean;
    retrieved_at: number;
    expires_at:   number;
    srv_record:   null;
    version:      Version;
    players:      Players;
    motd:         MOTD;
    icon:         null;
    mods:         any[];
    software:     null;
    plugins:      any[];
}

export interface MOTD {
    raw:   string;
    clean: string;
    html:  string;
}

export interface Players {
    online: number;
    max:    number;
    list:   any[];
}

export interface Version {
    name_raw:   string;
    name_clean: string;
    name_html:  string;
    protocol:   number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAPIMC(json: string): APIMC {
        return cast(JSON.parse(json), r("APIMC"));
    }

    public static aPIMCToJson(value: APIMC): string {
        return JSON.stringify(uncast(value, r("APIMC")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "APIMC": o([
        { json: "online", js: "online", typ: true },
        { json: "host", js: "host", typ: "" },
        { json: "port", js: "port", typ: 0 },
        { json: "ip_address", js: "ip_address", typ: "" },
        { json: "eula_blocked", js: "eula_blocked", typ: true },
        { json: "retrieved_at", js: "retrieved_at", typ: 0 },
        { json: "expires_at", js: "expires_at", typ: 0 },
        { json: "srv_record", js: "srv_record", typ: null },
        { json: "version", js: "version", typ: r("Version") },
        { json: "players", js: "players", typ: r("Players") },
        { json: "motd", js: "motd", typ: r("MOTD") },
        { json: "icon", js: "icon", typ: null },
        { json: "mods", js: "mods", typ: a("any") },
        { json: "software", js: "software", typ: null },
        { json: "plugins", js: "plugins", typ: a("any") },
    ], false),
    "MOTD": o([
        { json: "raw", js: "raw", typ: "" },
        { json: "clean", js: "clean", typ: "" },
        { json: "html", js: "html", typ: "" },
    ], false),
    "Players": o([
        { json: "online", js: "online", typ: 0 },
        { json: "max", js: "max", typ: 0 },
        { json: "list", js: "list", typ: a("any") },
    ], false),
    "Version": o([
        { json: "name_raw", js: "name_raw", typ: "" },
        { json: "name_clean", js: "name_clean", typ: "" },
        { json: "name_html", js: "name_html", typ: "" },
        { json: "protocol", js: "protocol", typ: 0 },
    ], false),
};
