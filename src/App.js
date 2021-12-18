import { getAuth,signInWithProvider,signInWithPopup,  GoogleAuthProvider, GithubAuthProvider, signOut  } from "firebase/auth";
import './App.css';
import { useState } from 'react';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  
  const [user, setUser] = useState({});
  const auth = getAuth();


  const handleGoogleSignIn = () => {
            // const auth = getAuth();
            signInWithPopup(auth, googleProvider)
            .then(result => {
              const {displayName, email, photoURL} = result.user;
              const loggedInUser = {
                name: displayName,
                email: email,
                photo: photoURL
              }
              setUser(loggedInUser)
              // console.log(user);
            })

            .catch(error => {
                   console.log(error.message);
            })
  }
  const handleGithubSignIn = () => {
         signInWithPopup(auth, githubProvider)
         .then(result => {
          const {displayName, email, photoURL} = result.user;  
          const loggedInUser = {
            name: displayName,
            email: email,
            photo: photoURL
          }
          setUser(loggedInUser)
          // console.log(user);
        })

        .catch(error => {
               console.log(error.message);
        })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then( () => {
      setUser({});
    } )
  }
  return (
    <div className="App">
        {
          !user.name ? <div><button onClick={handleGoogleSignIn}>google signIn</button>
        <button onClick={handleGithubSignIn}>Github SignIn</button>
        </div>: <button onClick={handleSignOut}>SignOut</button>

        }
        <br/>
        {
          user.name && <div>
            <h2>Welcome {user.name}</h2>
            <p>I know your email address {user.email}</p>
            <img src={user.photo} alt="/"></img>
          </div>
        }
    </div>
  );
}

export default App;
