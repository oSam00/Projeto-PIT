import { NavigatedData, Page } from '@nativescript/core';
import { MenuViewModel } from './menu-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MenuViewModel();
}