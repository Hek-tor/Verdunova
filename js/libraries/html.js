export const div = function (parent, attributes) {
    return createElement('div', parent, attributes);
}

export const section = function (parent, attributes) {
    return createElement('section', parent, attributes);
}

export const p = function (parent, attributes) {
    return createElement('p', parent, attributes);
}

export const img = function (parent, attributes) {
    return createElement('img', parent, attributes);
}

export const input = function (parent, attributes) {
    return createElement('input', parent, attributes);
}

export const ul = function (parent, attributes) {
    return createElement('ul', parent, attributes);
}

export const h3 = function (parent, attributes) {
    return createElement('h3', parent, attributes);
}

const createElement = function (type, parent, attributes) {
    let element = document.createElement(type);
    parent.appendChild(element);
    if (attributes != null) {
        for (const attribute in attributes) {
            element[attribute] = attributes[attribute];
        }
    }
    return element;
}