// Mobs on patrol...
function patrolling(patrolObject) {
    var stepstaken = 0;
    var token = patrolObject.token;
    var direction = patrolObject.direction;
    var steps = patrolObject.steps;
    
    setInterval(function () {
        log(patrolObject)
        if (token.get("status_bluemarker") === false) return;
        if (stepstaken > 5) {
            //Switch directions!
            steps = steps * -1; //will "flip" the direction we're walking
            stepstaken = 0; //reset steps back to 0.
        }
        token.set(direction, token.get(direction) + steps); //walk!
        stepstaken++;
    }, 2000); //take an action every 2 seconds
}

on("ready", function () {
    var patrols = [
        {token: findObjs({ name: "patrolHallway" })[0], direction: "left", steps: -47}
    ]
    
    for(i=0;i<patrols.length;i++){
        patrolling(patrols[i])
    }
    
});