import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgCZOQO4Je_EUCe_UovMsvWrIIIkJBQ_U",
    authDomain: "maayanpink.firebaseapp.com",
    projectId: "maayanpink",
    storageBucket: "maayanpink.appspot.com",
    messagingSenderId: "912925910629",
    appId: "1:912925910629:web:1000e0eb350d724898888c",
    measurementId: "G-SGCPHN20LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication
const auth = getAuth(app);

//checking if the user is signed in
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('User is signed in.')
    } else {
        console.log('User is signed out.')
        const greet = document.getElementById('hi');
        greet.innerHTML = "";
    }
});

//sign up
const newLogin = document.querySelector('#new-login');
newLogin.reset();
newLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = newLogin['signup-email'].value;
    const password = newLogin['signup-password'].value;
    console.log(email, password);

    //greeting user
    const num = email.indexOf('@');
    const emailName = email.slice(0, num);
    const greet = document.getElementById('hi');
    greet.innerHTML = "hi, " + emailName

    //sign up the user + error options
    const userCredential = createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        console.log(userCredential.user);
        newLogin.reset();
        newLogin.querySelector('.error').innerHTML = '';
    }).catch((error) => {
        const errorCode = error.code;
        var errorMessage = ""
        if (errorCode === "auth/weak-password") {
            errorMessage = "Password should be at least 6 characters"
        } else if (errorCode === "auth/email-already-in-use") {
            errorMessage = "This E-mail is already in use"
        } else if (errorCode === "auth/invalid-email") {
            errorMessage = "invalid E-mail"
        }
        newLogin.querySelector('.error').innerHTML = errorMessage;
    });
});

//closing the signup container
const loginContainer1 = document.getElementById('login-container1');
document.getElementById("sub1").addEventListener("click", hide1());


function hide1() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            loginContainer1.style.display = "none"
        }
    });
};

//sign in
const oldLogin = document.querySelector('#old-login');
oldLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = oldLogin['signin-email'].value;
    const password = oldLogin['signin-password'].value;
    console.log(email, password);

    //greeting user
    onAuthStateChanged(auth, user => {
        if (user != null) {
            const num = email.indexOf('@');
            const emailName = email.slice(0, num);
            const greet = document.getElementById('hi');
            greet.innerHTML = "hi, " + emailName
        } else {
            const greet = document.getElementById('hi');
            greet.innerHTML = "see you soon"
        };
    });

    //sign in  user + error
    const userCredential = signInWithEmailAndPassword(auth, email, password).then(userCredential => {
        console.log(userCredential.user);
        oldLogin.reset();
        oldLogin.querySelector('.error').innerHTML = '';
    }).catch((error) => {
        const errorCode = error.code;
        var errorMessage = ""
        if (errorCode === "auth/wrong-password") {
            errorMessage = "wrong password, try again"
        } else if (errorCode === "auth/user-not-found") {
            errorMessage = "Sorry, the user is not found"
        }
        oldLogin.querySelector('.error').innerHTML = errorMessage;
    });
});

//closing the sign in container
const loginContainer2 = document.getElementById('login-container2');
document.getElementById("sub2").addEventListener("click", hide2());

function hide2() {
    onAuthStateChanged(auth, user => {
        if (user != null) {
            loginContainer2.style.display = "none"
        }
    });
}

//reset password Email
const resetPassword = document.getElementById('change-password');
resetPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = resetPassword['sign-in-email'].value;
    sendPasswordResetEmail(auth, email)
        .then(() => {
            //closing the reset password container
            const newPassword = document.getElementById('new-password');
            document.getElementById("sub3").addEventListener("click", hide3());

            function hide3() {
                newPassword.style.display = "none"
            }
        })
})

//sign out 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth);
});