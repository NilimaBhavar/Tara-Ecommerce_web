import { useState } from "react";
import { useAuth } from "../context/authContextValue";
import { updateUserProfile } from "../services/authService";
import {
    isStrongPassword,
    isValidIndianPhone,
} from "../services/validation";

function Account() {
    const { user, login } = useAuth();
    const [phone, setPhone] = useState(user.phone || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [savingPhone, setSavingPhone] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const savePhone = async (event) => {
        event.preventDefault();
        setPhoneError("");
        setPhoneMessage("");

        if (!isValidIndianPhone(phone)) {
            setPhoneError("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        try {
            setSavingPhone(true);
            const updatedUser = await updateUserProfile({ phone });
            login({ ...user, ...updatedUser });
            setPhoneMessage("Phone number updated successfully.");
        } catch (error) {
            setPhoneError(
                error.response?.data?.message ||
                error.message ||
                "Could not update your phone number."
            );
        } finally {
            setSavingPhone(false);
        }
    };

    const savePassword = async (event) => {
        event.preventDefault();
        setPasswordError("");
        setPasswordMessage("");

        if (!currentPassword) {
            setPasswordError("Enter your current password.");
            return;
        }

        if (!isStrongPassword(newPassword)) {
            setPasswordError("New password must be at least 8 characters and include uppercase and lowercase letters, a number, and a symbol.");
            return;
        }

        try {
            setSavingPassword(true);
            const updatedUser = await updateUserProfile({
                currentPassword,
                newPassword,
            });
            login({ ...user, ...updatedUser });
            setCurrentPassword("");
            setNewPassword("");
            setPasswordMessage("Password updated successfully.");
        } catch (error) {
            setPasswordError(
                error.response?.data?.message ||
                error.message ||
                "Could not update your password."
            );
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <main className="tara-page account-page">
            <header className="page-heading">
                <p className="page-eyebrow">YOUR TARA STORE ACCOUNT</p>
                <h1>Account settings</h1>
                <p>Update your contact details and keep your password secure.</p>
            </header>

            <section className="account-profile-card">
                <div className="account-identity">
                    <p className="page-eyebrow">SIGNED IN AS</p>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    {user.isAdmin && <span className="account-admin-badge">Admin account</span>}
                </div>

                <form className="account-form" onSubmit={savePhone} noValidate>
                    <h2>Phone number</h2>
                    <p className="account-form-description">
                        Add or update the phone number used for your account and delivery details.
                    </p>
                    {phoneError && <p className="error-message" role="alert">{phoneError}</p>}
                    {phoneMessage && <p className="account-success-message" role="status">{phoneMessage}</p>}
                    <label htmlFor="account-phone">10-digit Indian phone number</label>
                    <input
                        id="account-phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        inputMode="numeric"
                        maxLength={10}
                        autoComplete="tel"
                        placeholder="Enter mobile number"
                    />
                    <button type="submit" disabled={savingPhone}>
                        {savingPhone ? "Saving..." : "Save phone number"}
                    </button>
                </form>

                <form className="account-form" onSubmit={savePassword} noValidate>
                    <h2>Change password</h2>
                    <p className="account-form-description">
                        Confirm your current password before choosing a new strong password.
                    </p>
                    {passwordError && <p className="error-message" role="alert">{passwordError}</p>}
                    {passwordMessage && <p className="account-success-message" role="status">{passwordMessage}</p>}
                    <label htmlFor="current-password">Current password</label>
                    <input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <label htmlFor="new-password">New password</label>
                    <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        autoComplete="new-password"
                        required
                    />
                    <p className="account-password-hint">
                        At least 8 characters with uppercase and lowercase letters, a number, and a symbol.
                    </p>
                    <button type="submit" disabled={savingPassword}>
                        {savingPassword ? "Saving..." : "Update password"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Account;
