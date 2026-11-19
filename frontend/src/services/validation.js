export const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(password);

export const isValidIndianPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

export const isValidIndianPinCode = (pinCode) => /^[1-9]\d{5}$/.test(pinCode);
