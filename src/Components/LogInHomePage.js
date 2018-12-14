import React from 'react';

const LogInHomePage = (props) => {
   const { googleSignIn } = props
   return (
      <div className="logInPage">
         <h1>Noted</h1>
         <form className="logInForm">
            <button className="googleSignIn" onClick={googleSignIn}>Sign in with Google</button>
            <button className="guestSignIn">Sign In As Guest</button>
         </form>
      </div>
   )
}

export default LogInHomePage