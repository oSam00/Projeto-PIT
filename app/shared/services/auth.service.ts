import firebase from '@nativescript/firebase-core';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    Auth,
    User
} from '@nativescript/firebase-auth';

export class AuthService {
    private static instance: AuthService;
    private auth: Auth;

    private constructor() {
        this.auth = getAuth(firebase().app);
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(email: string, password: string): Promise<User> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    getCurrentUser(): User | null {
        return this.auth.currentUser;
    }

    isAuthenticated(): boolean {
        return this.auth.currentUser !== null;
    }
}
