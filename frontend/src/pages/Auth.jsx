// AuthPage.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthPage = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      {!isAuthenticated ? (
        <>
          <h2>Welcome to TutorLink</h2>
          <button onClick={() => loginWithRedirect()} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Log In / Sign Up
          </button>
        </>
      ) : (
        <>
          <h2>Welcome, {user.name}</h2>
          {user.picture && <img src={user.picture} alt="Profile" style={{ borderRadius: "50%", width: "100px", height: "100px" }} />}
          <p>{user.email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
