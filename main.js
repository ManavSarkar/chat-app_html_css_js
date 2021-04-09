// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyB4m_yGbcmP2pJeBKlYvtoW5VAXgFM-Svc",
//     authDomain: "chat-app-tutorial-e0e87.firebaseapp.com",
//     projectId: "chat-app-tutorial-e0e87",
//     storageBucket: "chat-app-tutorial-e0e87.appspot.com",
//     messagingSenderId: "356136821162",
//     appId: "1:356136821162:web:f680b8ce26dd14bf3a4bd3",
//     measurementId: "G-GVETP4ZKRF"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
    apiKey: "AIzaSyB4m_yGbcmP2pJeBKlYvtoW5VAXgFM-Svc",
    authDomain: "chat-app-tutorial-e0e87.firebaseapp.com",
    projectId: "chat-app-tutorial-e0e87",    
    databaseURL: "https://chat-app-tutorial-e0e87-default-rtdb.firebaseio.com/",
    storageBucket: "chat-app-tutorial-e0e87.appspot.com",
    messagingSenderId: "356136821162",
    appId: "1:356136821162:web:f680b8ce26dd14bf3a4bd3",
    measurementId: "G-GVETP4ZKRF"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db=firebase.firestore();
if (!localStorage.getItem('name')) {
  name = prompt('What is your name?')
  localStorage.setItem('name', name)
} else {
  name = localStorage.getItem('name')
}
document.querySelector('#name').innerText = name

document.querySelector('#change-name').addEventListener('click', () => {
  name = prompt('What is your name?')
  localStorage.setItem('name', name)
  document.querySelector('#name').innerText = name
})
db.collection('messages')
  .add({
    name: 'John Doe',
    message: 'Hello world!' 
  })
  .then(function (docRef) {
    console.log(`Document written with ID: ${docRef.id}`);
  })
  .catch(function (error) {
    console.error(`Error adding document: ${error}`);
  });
document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
})
document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  let message = document.querySelector('#message-input').value 
})
document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  let message = document.querySelector('#message-input').value 
  db.collection('messages')
  .add({
    name: name,
    message: message,
    date: firebase.firestore.Timestamp.fromMillis(Date.now())
  })
  .then((docRef) => {
    console.log(`Document written with ID: ${docRef.id}`);
    document.querySelector('#message-form').reset()
  })
  .catch((error) => {
    console.error(`Error adding document: ${error}`);
  });
})

db.collection('messages')
.orderBy('date', 'asc')
.onSnapshot(snapshot => {
  document.querySelector('#messages').innerHTML = ''
  snapshot.forEach(doc => {
    let message = document.createElement('div')
    message.innerHTML = `
    <p class="name">${doc.data().name}</p>
    <p>${doc.data().message}</p>
    `
    document.querySelector('#messages').prepend(message)
  })
})