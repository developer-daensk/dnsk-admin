import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
  title?: string;
  description?: string;
  requiresAuth?: boolean;
  roles?: string[];
}

export interface RouteConfig extends Omit<RouteObject, 'children' | 'index'> {
  children?: RouteConfig[];
  meta?: RouteMeta;
  index?: false;
}

export type Routes = RouteConfig[];

export interface RouteParams {
  [key: string]: string | number;
}

export interface RouteQuery {
  [key: string]: string | number | boolean;
}
