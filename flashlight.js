on("ready", function () {
    on('change:graphic', function(obj){
        if(obj.get('statusmarkers').includes('yellow')){
              obj.set({
                  light_radius: '30',
                  light_dimradius: '10',
                  light_otherplayers: true,
                  light_hassight: true,
                  light_angle: '75'
              })
          } else {
              obj.set({
                  light_radius: '',
                  light_dimradius: '',
                  light_otherplayers: true,
                  light_hassight: true,
                  light_angle: ''
              })
          }
      })
});
     