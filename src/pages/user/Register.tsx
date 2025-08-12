import { useState } from "react";
import { signUpWithEmail } from "../../functions/storeFunctions";
import { toast } from "react-toastify";

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signing, setSigning] = useState(false);

    const handleRegister = async (e: any) => {

        setSigning(true);
        e.preventDefault();
        if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (!email.includes('@')) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }

        if (!confirmPassword) {
            toast.error("Please confirm your password.");
            return;
        }
        try {
            const user = await signUpWithEmail(email, password);
            toast.success(`Registered successfully! Please verify your email: ${user.email}`);
            setSigning(false);
            setTimeout(() => window.location.href = "/login", 3000);
        }
        catch (error) {
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please check your details and try again.");
            setSigning(false);
        }
    };
    return (
        <div className="register-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="site--title">Register</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email"
                                        aria-describedby="emailHelp"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Re Type Password</label>
                                    <input type="password" className="form-control" id="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register {signing ? <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div> : <></>}</button>
                                <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}