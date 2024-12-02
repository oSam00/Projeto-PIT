import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../shared/services/auth.service';
import { validateEmail, validatePassword } from '../../shared/utils/validation';
import { showError, showSuccess } from '../../shared/utils/dialogs';

export class LoginViewModel extends Observable {
    private authService: AuthService;
    private _email: string = '';
    private _password: string = '';
    private _isLogin: boolean = true;
    private _isLoading: boolean = false;
    private _errorMessage: string = '';

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
            this.clearError();
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
            this.clearError();
        }
    }

    get isLogin(): boolean {
        return this._isLogin;
    }

    set isLogin(value: boolean) {
        if (this._isLogin !== value) {
            this._isLogin = value;
            this.notifyPropertyChange('isLogin', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    private clearError(): void {
        if (this._errorMessage) {
            this.errorMessage = '';
        }
    }

    private validateForm(): boolean {
        const emailTrimmed = this._email.trim();

        if (!emailTrimmed || !this._password) {
            this.errorMessage = 'Please fill in all fields';
            return false;
        }

        if (!validateEmail(emailTrimmed)) {
            this.errorMessage = 'Please enter a valid email address';
            return false;
        }

        if (!validatePassword(this._password)) {
            this.errorMessage = 'Password must be at least 6 characters long';
            return false;
        }

        return true;
    }

    async onSubmit() {
        console.log('onSubmit chamado');
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            if (this._isLogin) {
                await this.authService.login(this._email.trim(), this._password);
                showSuccess('Login successful');
            } else {
                await this.authService.register(this._email.trim(), this._password);
                showSuccess('Registration successful');
            }
            
            Frame.topmost().navigate({
                moduleName: 'pages/menu/menu-page',
                clearHistory: true
            });
        } catch (error) {
            console.error('Authentication error:', error);
            this.errorMessage = error.message || 'An error occurred';
            showError(this.errorMessage);
        } finally {
            this.isLoading = false;
        }
    }

    onToggleMode() {
        this.isLogin = !this._isLogin;
        this.clearError();
        this.email = '';
        this.password = '';
    }
}
