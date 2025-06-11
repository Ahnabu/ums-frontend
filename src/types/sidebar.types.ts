import type { ReactNode } from "react";

export type TSidebarItem = {
    key: string;
    label: ReactNode;
    children?: TSidebarItem[];
}

export type TRoute = {
    path: string;
    element: ReactNode,
}

export type TUserPaths = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPaths[];
}

 export type TSidebarPaths = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TSidebarPaths[];
}