import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBWrkg4c9MIjBFFl8O21935qxKml_M7sVo",
    authDomain: "ef-nl-dev.firebaseapp.com",
    projectId: "ef-nl-dev",
    storageBucket: "ef-nl-dev.appspot.com",
    messagingSenderId: "398599617169",
    appId: "1:398599617169:web:69b6cf733714416a31dd30"
}

firebase.initializeApp(firebaseConfig)

export default firebase