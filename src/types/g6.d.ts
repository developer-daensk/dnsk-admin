import { ReactElement } from 'react';

declare module '@antv/g6' {
  export interface NodeOptions {
    label: ReactElement;
    style: {
      fill: string;
      stroke: string;
    };
  }

  export interface GraphOptions {
    container: HTMLElement;
    width: number;
    height: number;
    modes?: {
      default: string[];
    };
    defaultNode?: {
      size: [number, number];
      type: string;
      style: {
        fill: string;
        stroke: string;
        radius: number;
      };
    };
    defaultEdge?: {
      type: string;
      style: {
        stroke: string;
      };
    };
    layout?: {
      type: string;
      direction: string;
      nodeSep: number;
      rankSep: number;
    };
    nodeStateStyles?: {
      hover?: {
        shadowColor: string;
        shadowBlur: number;
      };
    };
    node?: (node: NodeConfig) => NodeOptions;
  }

  export interface NodeConfig {
    id: string;
    label: string | ReactElement;
    type: string;
    style?: {
      fill: string;
      stroke: string;
    };
  }

  export interface GraphData {
    id: string;
    label: string;
    type: string;
    children?: GraphData[];
  }

  export class Graph {
    constructor(options: GraphOptions);
    data(data: GraphData): void;
    render(): void;
    destroy(): void;
    changeSize(width: number, height: number): void;
  }
}

declare module 'dagre';
