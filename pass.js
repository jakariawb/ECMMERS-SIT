


var textcontine = 'Welcome to My website!'
 var text = document.getElementById('text')

  for(let y = 0; y < textcontine.length; y++){
  setTimeout(() =>{
   text.textContent += textcontine[y];
  },y * 100);
  setTimeout(()=>{
    for(y = textcontine.length;y >= 0;y--){
      setTimeout(()=>{
        text.textContent = textcontine.substring(0, y)
      }, (textcontine.length - y)* 100)
    }
  },textcontine.length * 100 + 500)
  }


var rendompassword = () =>{

  var length = 12;
var charsit = "abcdefghijklmonpqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
var genratRendomPss = ''
  for(var i = 0; i< length; i++){
   var rendompassword11 = Math.floor(Math.random() * charsit.length)
  genratRendomPss += charsit[rendompassword11];
   var Newpass = document.getElementById('NewPass')
   Newpass.textContent = genratRendomPss;

}
  checkStrength(genratRendomPss);
  
}


var checkStrength = (genratRendomPss) =>{
  var strength = 0;
  if(genratRendomPss.length >= 9){
    strength++
  }
  if(/[A-Z]/.test(genratRendomPss)){
    strength++
  }
  if(/[0-9]/.test(genratRendomPss)){
    strength++
  }
  if(/[!@#$%^&*]/.test(genratRendomPss)){
    strength++
  }
  var strengthtext = ['weak','Medium','Strong','Very Strong'] [strength - 1];
  document.getElementById('PassJustyfy').textContent = `strength: ${strengthtext}`;
  changeBGColor(strength);
}

var changeBGColor = (strength) =>{
  var color = ['#ff4d4d', '#ffa500', '#4682b4', '#32cd32']
  document.body.style.backgroundColor = color [strength-1]|| '#ff4d4d'
}
