import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../functions/storeFunctions";
import { useState } from "react";
import { toast } from "react-toastify";
import { setAuthUser } from "../../app/store";
import Loading from "../../components/loading/Laoding";

export default function Account (){
    const user = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try{
            signOut();
            dispatch(setAuthUser(null))
            window.location.reload();
            return;
        }catch (e){
            console.error(e)
            window.location.href = "/home";
        }
    }
    return (
        <div className="account-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="site--title">Account</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <p>Signed in as: {user?.email}</p>
                            <button className="btn btn-danger" onClick={(e) => {
                                e.preventDefault();
                                handleSignOut();
                                console.log("Sign out clicked");
                            }}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}