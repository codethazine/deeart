import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
// import logo from 'logo.svg';
import { useDispatch } from 'react-redux';
//import { doTrialAction, doTrialAsyncAction } from 'app/actions';
import Homepage from 'features/homepage/Homepage';
import Faq from 'features/faq/Faq';
import 'App.scss';



import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);


const App = () => {

  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
          break;
        default:
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        
      <div className="">
        <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })}>Open Facebook</button>
        {/* <button onClick={() => Auth.signOut()}>Sign Out {user.getUsername()}</button> */}
      </div>
      </header>
    </div>
  );
}

export default App;
