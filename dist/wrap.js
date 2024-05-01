"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softWrapper = exports.hardWrapper = void 0;
const lines_js_1 = require("./lines.js");
// wrap runs into a block using hard coded breaks eg \n within the text runs
const hardWrapper = measureText => runs => {
    const block = {
        lines: (0, lines_js_1.runsToLines)(measureText)(runs),
        width: 0,
        height: 0
    };
    block.width = Math.max(...block.lines.map(line => line.width));
    block.height = block.lines.reduce((acc, line) => acc + line.height, 0);
    return block;
};
exports.hardWrapper = hardWrapper;
// takes a hard wrapped block and soft wraps within the lines to fit a given
// width
const softWrapper = maxWidth => block => {
    const wrapped = {
        lines: [],
        width: 0,
        height: 0,
        maxWidth
    };
    const wrapLine = (line) => {
        const softWrappedLines = [];
        let currentWidth = 0;
        let currentLine = {
            words: [],
            width: 0,
            height: 0
        };
        const push = () => {
            if (currentLine.words.length === 0)
                return;
            softWrappedLines.push(currentLine);
            wrapped.width = Math.max(wrapped.width, currentLine.width);
            wrapped.height += currentLine.height;
        };
        for (const group of line.words) {
            const wordWidth = group.width;
            const wordWidthWithSpace = group.advanceX;
            if (currentWidth + wordWidth <= maxWidth) {
                currentWidth += wordWidthWithSpace;
                currentLine.words.push(group);
                currentLine.width += wordWidthWithSpace;
                currentLine.height = Math.max(currentLine.height, group.height);
                continue;
            }
            push();
            currentLine = {
                words: [group],
                width: wordWidthWithSpace,
                height: group.height
            };
            currentWidth = wordWidthWithSpace;
        }
        push();
        return softWrappedLines;
    };
    for (const line of block.lines) {
        // if the line already fits, don't soft wrap it
        if (line.width <= maxWidth) {
            wrapped.lines.push(line);
            wrapped.width = Math.max(wrapped.width, line.width);
            wrapped.height += line.height;
            continue;
        }
        wrapped.lines.push(...wrapLine(line));
    }
    return wrapped;
};
exports.softWrapper = softWrapper;
//# sourceMappingURL=wrap.js.map