import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQeMfG15IFXgDT_5RYOQferU7pds7E0Fc",
  authDomain: "trivia-7a705.firebaseapp.com",
  projectId: "trivia-7a705",
  storageBucket: "trivia-7a705.appspot.com",
  messagingSenderId: "775258286646",
  appId: "1:775258286646:web:797eec688d5ffd16708697"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()

//need to find where these next two func are
export const colRefTrivia = db.collection("trivia")
export const colRefQuestion = db.collection("question")
const docRefPanel = colRefTrivia.doc("Panel")

  //take away async
export const toggleQ = async (num) => {
  return (
     colRefQuestion.doc(`q${num}`).update({
      show: ! (await colRefQuestion.doc(`q${num}`).get()).data().show
    })
  )
}


export const signInAnon = () => {
  auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
  return (
    auth.signInAnonymously()
  )
}

export const signOut = () => {
  return (
    auth.signOut()
  )
}



export const getPanelSnapshot = (obs) => {
  return (
    docRefPanel.onSnapshot(obs)
  )
}

export const setBuzzUser = async (name) => {
  return (
    await docRefPanel.update({
      name: name,
      buzzerStatus: true
    })
  )
}

export const resetBuzzUser = async () => {
  return (
    await docRefPanel.update({
      name: "Buzzer Active",
      buzzerStatus: false
    })
  )
}



export const toggleBuzzBar = async () => {
  return (
    docRefPanel.update({
      barStatus: !(await docRefPanel.get()).data().barStatus
    })
  )
}

export const setBuzzBar = async (val) => {
  return (
    docRefPanel.update({
      barStatus: val
    })
  )
}



export const setAnswerCard = (val) => {
  return (
    docRefPanel.update({
      answerCard: val
    })
  )
}

export const toggleAnswerCard = async () => {
  return (
    docRefPanel.update({
      answerCard: ! (await docRefPanel.get()).data().answerCard
    })
  )
}

  


  export default firebase