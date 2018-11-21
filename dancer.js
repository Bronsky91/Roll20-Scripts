var dancingMood = true;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var directions = ['left', 'top'];
var directionsReverse = [1, -1];
var lightColors = ['#d5d505', '	#41cd38', '#1f787c', '#2d4a5a', '#7f5579']

function timeoutDancer(dancer, dancerDirection) {
    setTimeout(function () {
        var d = directions[getRandomInt(2)]
        var dr = directionsReverse[getRandomInt(2)]
        dancer.set(d, dancer.get(d) + (5 * dr));
        dancer.set('fliph', getRandomInt(2));
        if(dancingMood){
            timeoutDancer(dancer, d);
        } else {
            return
        }
    }, 1000);
}

on('ready', function(){
    var dancers = findObjs({name: 'dancer'});
    for(i=0;i<dancers.length;i++){
        timeoutDancer(dancers[i], dancers[i].get('left'))
        log(dancers[i])
    }
});

on("chat:message", function(msg) {
  //This allows players to enter !sr <number> to roll a number of d6 dice with a target of 4.
  if(msg.type == "api" && msg.content.indexOf("!dance") !== -1) {
    if(dancingMood) {
        dancingMood = false;
    } else {
        dancingMood = true;
        var dancers = findObjs({name: 'dancer'});
        for(i=0;i<dancers.length;i++){
            timeoutDancer(dancers[i], dancers[i].get('left'))
        }
    }
    sendChat(msg.who, "Dancing = " + dancingMood);
  }
});