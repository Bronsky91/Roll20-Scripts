var lightsPower = 'off';

function timeoutShipLights(light, lightDirection, lightValue) {
    setTimeout(function () {
        if(lightDirection == 'up') {
            if(lightValue < 40){
                lightValue += 2;
                light.set('light_radius', lightValue)
            } else {
                lightDirection = 'down'
            }
        } else {
            if(lightValue > 0){
                lightValue -= 2;
                light.set('light_radius', lightValue)
            } else {
                lightDirection = 'up'   
            }
        }
        if(lightsPower == 'on'){
            light.set('light_radius', 40)
            return
        }
        timeoutShipLights(light, lightDirection, lightValue);
    }, 100);
}

on('ready', function(){
    var lights = findObjs({name: 'shipLight'});
    for(i=0;i<lights.length;i++){
        lights[i].set('light_radius', 0);
        timeoutShipLights(lights[i], 'up', lights[i].get('light_radius'))
   }
});

on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!lights") !== -1) {
    if(lightsPower == 'off'){
        lightsPower = 'on';
    } else {
        lightsPower = 'off'
        var lights = findObjs({name: 'shipLight'});
        for(i=0;i<lights.length;i++){
            lights[i].set('light_radius', 0);
            timeoutShipLights(lights[i], 'up', lights[i].get('light_radius'))
        }
    }
    sendChat(msg.who, "Lights " + lightsPower);
  }
});