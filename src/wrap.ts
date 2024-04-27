import { runsToLines } from './lines.js'
import { Block, HardWrapper, Line, SoftWrapper, WrappedBlock } from './types.js'

export const hardWrapper: HardWrapper = measureText =>
  runs => {
    const block: Block = {
      lines: runsToLines(measureText)(runs),
      width: 0,
      height: 0
    }

    block.width = Math.max(...block.lines.map(line => line.width))
    block.height = block.lines.reduce((acc, line) => acc + line.height, 0)

    return block
  }

export const softWrapper: SoftWrapper = maxWidth =>
  block => {
    const wrapped: WrappedBlock = {
      lines: [],
      width: 0,
      height: 0,
      maxWidth
    }

    const wrapLine = (line: Line) => {
      const softWrappedLines: Line[] = []

      let currentWidth = 0

      let currentLine: Line = {
        words: [],
        width: 0,
        height: 0
      }

      const push = () => {
        if (currentLine.words.length > 0) {
          softWrappedLines.push(currentLine)

          wrapped.width = Math.max(wrapped.width, currentLine.width)
          wrapped.height += currentLine.height
        }
      }

      for (const group of line.words) {
        const wordWidth = group.width
        const wordWidthWithSpace = group.advanceX

        if (currentWidth + wordWidth <= maxWidth) {
          currentWidth += wordWidthWithSpace

          currentLine.words.push(group)
          currentLine.width += wordWidthWithSpace
          currentLine.height = Math.max(currentLine.height, group.height)
        } else {
          push()

          currentLine = {
            words: [group],
            width: 0,
            height: 0
          }

          currentLine.width = wordWidthWithSpace
          currentLine.height = group.height

          currentWidth = wordWidthWithSpace
        }
      }

      push()

      return softWrappedLines
    }

    for (const line of block.lines) {
      // if the line already fits, don't soft wrap it
      if( line.width <= maxWidth ){
        wrapped.lines.push(line)
        wrapped.width = Math.max(wrapped.width, line.width)
        wrapped.height += line.height
        
        continue
      }

      wrapped.lines.push(...wrapLine(line))
    }

    return wrapped
  }