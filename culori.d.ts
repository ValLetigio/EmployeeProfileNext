declare module 'culori' {
    export function formatRgb(color: any): string;
    export function parseOklch(color: string): any;
    export function parse(color: string): any;
    export function formatHex(color: any): string;
    export function formatHsl(color: any): string;
  }