"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawRunAligned = exports.drawBlock = void 0;
// takes a dumb fn that just knows how to draw a given run at a given location
// and handles the positioning for each run according to the block layout
const drawBlock = (drawRun) => (block, x = 0, y = 0) => {
    if (block.lines.length === 0)
        return;
    let cx = x;
    let cy = y - block.lines[0].height;
    for (const line of block.lines) {
        cy += line.height;
        for (const word of line.words) {
            for (const run of word.runs) {
                drawRun(run, cx, cy, word, line, block);
                cx += run.advanceX;
            }
        }
        cx = x;
    }
};
exports.drawBlock = drawBlock;
// wraps a dumb fn to add horizontal alignment to the drawn runs at the line
// level  
const drawRunAligned = (baseDrawRun, align) => (run, x, y, word, line, block) => {
    const dx = align === 'center' ? (block.maxWidth - line.width) / 2 :
        align === 'right' ? block.maxWidth - line.width : 0;
    baseDrawRun(run, x + dx, y, word, line, block);
};
exports.drawRunAligned = drawRunAligned;
//# sourceMappingURL=draw.js.map