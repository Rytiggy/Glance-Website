import firebase from "firebase";
import { LocalStorage } from "quasar";

export async function login(context, { email, password }) {
  context;
  let response = null;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      LocalStorage.set("emailForSignIn", email);

      response = { response: true };
    })
    .catch(error => {
      response = {
        response: false,
        error: error.message
      };
      // Some error occurred, you can inspect the code: error.code
    });
  return response;
}

export async function register(context, { email, password }) {
  context;
  let response = null;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      LocalStorage.set("emailForSignIn", email);

      response = { response: true };
    })
    .catch(error => {
      response = {
        response: false,
        error: error.message
      };
      // Some error occurred, you can inspect the code: error.code
    });
  return response;
}

export async function logout() {
  console.log("logout");
  await firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Signed Out");
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
}
