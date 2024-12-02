export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const getAuthErrorMessage = (error: string): string => {
    if (error.includes('auth/wrong-password')) {
        return 'Incorrect password';
    } else if (error.includes('auth/user-not-found')) {
        return 'No account found with this email';
    } else if (error.includes('auth/invalid-email')) {
        return 'Invalid email address';
    } else if (error.includes('auth/weak-password')) {
        return 'Password should be at least 6 characters';
    } else if (error.includes('auth/email-already-in-use')) {
        return 'An account already exists with this email';
    } else if (error.includes('auth/network-request-failed')) {
        return 'Network error. Please check your internet connection';
    }
    return 'An error occurred. Please try again';
};