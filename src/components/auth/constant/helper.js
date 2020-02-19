export const isEmailValidate = (data) => {
    let hasError = false;
    let message = '';
    let isVerified = false;
    if (data === undefined) {
        return { hasError, message, isVerified };
    }
    const EMAILREGEX = /\S+@\S+\.\S+/;
    if (data === '') {
        message = "Email I'D required";
        hasError = true;
        isVerified = false;
        return { hasError, message, isVerified };
    }
    if (!EMAILREGEX.test(data)) {
        message = 'Please Enter a valid Email Address';
        hasError = true;
        isVerified = false;
        return { hasError, message, isVerified };
    }
    message = '';
    hasError = false;
    isVerified = true;
};

export const isPasswordValidate = (data) => {
    let hasError = false;
    let message = '';
    let isVerified = false;
    if (data === undefined) {
        return { hasError, message, isVerified };
    }
    if (data === '' || typeof data === 'undefined') {
        message = 'Password Required';
        hasError = true;
        return { hasError, message, isVerified };
    }
    if (data.length < 5) {
        message = 'Password length should be greater than 5';
        hasError = true;
        return { hasError, message, isVerified };
    }
    if (!/[a-z]/.test(data) || !/[A-Z]/.test(data) || !/[0-9]/.test(data) || !/[_!@#%&]/.test(data)) {
        message = 'Should be a valid Password!';
        hasError = true;
        return { hasError, message, isVerified };
    }
    message = '';
    hasError = false;
    isVerified = true;
    return { hasError, message, isVerified };
};
export const isPhoneNumbereValidate = (value) =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? { hasError: true, message: 'Invalid phone number, must be 10 digits' } : { hasError: false, message: "" };


