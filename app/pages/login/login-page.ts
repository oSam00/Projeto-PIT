import { NavigatedData, Page } from '@nativescript/core';
import { LoginViewModel } from './login-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;

    if (!page || !(page instanceof Page)) {
        console.error('The object is not an instance of Page.');
        return;
    }

    // Cria uma nova instância apenas se ainda não estiver configurada
    if (!page.bindingContext) {
        page.bindingContext = new LoginViewModel();
    }
}
