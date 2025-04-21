import { ReactElement } from 'react';

export interface RouteItem {
  path: string;
  label: string;
  component: ReactElement;
}

export const routes: RouteItem[];
