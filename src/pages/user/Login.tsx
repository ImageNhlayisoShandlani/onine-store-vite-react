import { useEffect, useState } from "react";
import { signInWithEmail } from "../../functions/storeFunctions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../app/store";
import Loading from "../../components/loading/Laoding";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signing, setSigning] = useState(false);
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const handleLogin = async (e: any) => {

        e.preventDefault();
        try {
            setSigning(true);
            const user = await signInWithEmail(email, password);
            //toast.success(`Logged in as, ${user.email}!`);
            dispatch(setAuthUser(user.email));
            setEmail('');
            setPassword('')
            window.location.href = "/account";
            setSigning(false);
            return;
        } catch (error) {
            console.error("Login failed:", error);
            setSigning(false);
        }
    }

    useEffect(() => {}, [email, password])

    return (
        <div className="login-page">

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="site--title">Login</h1>
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
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login {signing ? <Loading /> : <></>}</button>
                                <p className="mt-3">Don't have an account? <a href="/register">Register here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}