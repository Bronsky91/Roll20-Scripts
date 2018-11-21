// Mobs on patrol...
function patrolling(patrolObject) {
    var stepstaken = 0;
    var token = patrolObject.token;
    var direction = patrolObject.direction;
    var steps = patrolObject.steps;
    var pathLength = patrolObject.pathLength;
    
    setInterval(function () {
        if (token.get("status_bluemarker") === false) return;
        if (stepstaken > pathLength) {
            //Switch directions!
            if (direction == "left" && !token.get("fliph")) {
                token.set("fliph", true);
            } else {
                token.set("fliph", false);
            }
            steps = steps * -1; //will "flip" the direction we're walking
            stepstaken = 0; //reset steps back to 0.
        }
        token.set(direction, token.get(direction) + steps); //walk!
        stepstaken++;
    }, 2000); //take an action every 2 seconds
}

on("ready", function () {
    var patrols = [
        {token: findObjs({ name: "patrolHallway" })[0], direction: "left", steps: -47, pathLength: 5},
        {token: findObjs({ name: "patrolEngine1" })[0], direction: "top", steps: 47, pathLength: 10},
        {token: findObjs({ name: "patrolEngine2" })[0], direction: "top", steps: -47, pathLength: 10},
        {token: findObjs({ name: "patrolBridge1" })[0], direction: "top", steps: 47, pathLength: 5},
        {token: findObjs({ name: "patrolBridge2" })[0], direction: "top", steps: -47, pathLength: 6},
        {token: findObjs({ name: "patrolBridge3" })[0], direction: "top", steps: 47, pathLength: 4}
    ]
    
    for(i=0;i<patrols.length;i++){
        patrolling(patrols[i])
    }
    
});