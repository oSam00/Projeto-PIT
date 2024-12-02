import { alert } from '@nativescript/core/ui/dialogs';

export function showError(message: string): Promise<void> {
    return alert({
        title: 'Error',
        message: message,
        okButtonText: 'OK'
    });
}

export function showSuccess(message: string): Promise<void> {
    return alert({
        title: 'Success',
        message: message,
        okButtonText: 'OK'
    });
}