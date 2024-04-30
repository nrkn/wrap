import { MeasureRunWidth, MeasuredRun, TextRun, TextRunStyle } from './types.js';
export declare const defaultRun: (text: string) => TextRun;
export declare const createRun: (text: string, ...styles: Partial<TextRunStyle>[]) => TextRun;
export declare const runFactory: (...baseStyles: Partial<TextRunStyle>[]) => (text: string, ...instanceStyles: Partial<TextRunStyle>[]) => TextRun;
export declare const runScaler: (fontSizeScale: number) => (run: TextRun) => TextRun;
export declare const splitRunOnSpaces: (run: TextRun) => TextRun[];
export declare const splitRunsOnSpaces: (runs: TextRun[]) => TextRun[];
export declare const splitRunOnNewlines: (run: TextRun) => TextRun[];
export declare const splitRunsIntoLines: (runs: TextRun[]) => TextRun[][];
export declare const groupWords: (wordRuns: TextRun[]) => TextRun[][];
export declare const measuredRun: (measureWidth: MeasureRunWidth) => (run: TextRun) => MeasuredRun;
