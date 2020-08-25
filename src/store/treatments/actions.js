import firebase from "firebase";

export async function getIOB() {
  var userId = firebase.auth().currentUser.uid;

  return await firebase
    .database()
    .ref(`treatments/${userId}/iob`)
    .once("value")
    .then(function(snapshot) {
      var userIOB = snapshot.val();
      return userIOB;
    });
}
export async function getCOB() {
  var userId = firebase.auth().currentUser.uid;
  return await firebase
    .database()
    .ref(`treatments/${userId}/cob`)
    .once("value")
    .then(function(snapshot) {
      var userCOB = snapshot.val();
      return userCOB;
      //(snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    });
}
