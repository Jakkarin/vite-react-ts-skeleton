import routes from "./index";
import fs from 'fs';

type R = typeof routes;

const store = new Map<string, any>();

function walk(routes: R, parent?: any) {
    for (let v of routes) {
        const clone = { ...v };

        if (parent && parent.name && v.name) {
            clone.name = [parent.name, v.name].join('.');
        }

        if (parent && parent.path && v.path) {
            clone.path = [parent.path, v.path].join('/');
        }

        if (clone.name) {
            store.set(clone.name, { path: '/' + clone.path });
        }

        if (v.children) {
            walk(v.children, clone);
        }
    }
}

walk(routes);

const object = Object.fromEntries(store.entries());

const template = `
const named = ${JSON.stringify(object, undefined, 2)};

export default named;
`;

fs.writeFileSync('./src/routes/named.ts', template);