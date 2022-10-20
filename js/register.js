// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDedOnQEQ7yPVqXLx6I0YYXHZ_9OT5sDDo",
  authDomain: "gold-blueprint-353900.firebaseapp.com",
  databaseURL: "https://gold-blueprint-353900-default-rtdb.firebaseio.com",
  projectId: "gold-blueprint-353900",
  storageBucket: "gold-blueprint-353900.appspot.com",
  messagingSenderId: "657892393243",
  appId: "1:657892393243:web:3d0bc4736f7d5911c1d3be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database=getDatabase(app);

//Button event
registerButton.addEventListener('click',(e)=>{
  e.preventDefault()
  var name=document.getElementById('name').value
  var lastname=document.getElementById('lastname').value
  var rol=document.getElementById('rol').value
  var option=document.getElementsByTagName('option')
  var password=document.getElementById('password').value
  var password2=document.getElementById('password2').value
  var email=document.getElementById('email').value
  
  if(verify()==true){
    if(verifyPassword()==true){
      if(rol==1){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          set(ref(database, 'User/Farme/' + user.uid), {
            Nombre:name,
            Apellido:lastname,
            rol:option[rol].innerHTML,
            Correo: email,
            Contraseña: password,
            Confirmacion: password2,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      }
      else if(rol==2){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          set(ref(database, 'User/Buyer/' + user.uid), {
            Nombre:name,
            Apellido:lastname,
            rol:option[rol].innerHTML,
            Correo: email,
            Contraseña: password,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      }
      else{
        Swal.fire({
          title:'Debe seleccionar un rol',
          icon:'error'
        }) 
      }

    }
    else{
      Swal.fire({
        title:'Las contraseñas no coinciden',
        icon:'error'
      }) 
    }

  }
  else{
    Swal.fire({
      title:'Debe llenar todos los campos',
      icon:'error'
    })
  }

  document.getElementById('form1').reset()
})

function verifyPassword(){
var password=document.getElementById('password').value
var confirmPassword=document.getElementById('password2').value

if(password!=confirmPassword){
  return false;
}
else{
  return true;
}
}

function verify(){
var name=document.getElementById('name').value
var lastname=document.getElementById('lastname').value;
var password=document.getElementById('password').value
var email=document.getElementById('email').value

if((name.length==0)||(lastname.length==0)||(password.length==0)||(email.length==0)){
  return false;
}
else{
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Registro completado'
  })
  return true;
}
}

