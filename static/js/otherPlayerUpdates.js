var createPlayerCube = function(ID, createTranslation){
  console.log(ID, createTranslation);

  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
  //var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

  var materialArray = [];
  materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/xpos.png' ) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/xneg.png' ) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/ypos.png' ) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/yneg.png' ) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/zpos.png' ) }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/zneg.png' ) }));

  var material = new THREE.MeshFaceMaterial(materialArray);

  var playerCube = new THREE.Mesh( geometry, material );

  playerCube.name = 'player-' + ID;
  console.log('creating playerCube-', playerCube.name)
  playerCube.position.y += 10;


  playerCube.velocity = {};
  playerCube.rotationalVelocity = {};

  playerCube.velocity.x = 0;
  playerCube.velocity.y = 0;
  playerCube.velocity.z = 0;

  playerCube.rotationalVelocity.x = 0;
  playerCube.rotationalVelocity.y = 0;


  playerCube.lastTween = performance.now();
  playerCube.lastServerUpdate = performance.now();
  playerCube.moving = false;

  playerCube.tweenedMove = function(){
    if(playerCube.moving){

        var updateTime = socketInterval;
        var interval = (performance.now() - playerCube.lastTween);



        if (performance.now() < playerCube.lastServerUpdate + updateTime){
          console.log('moving cube')

          playerCube.position.x += (playerCube.velocity.x * interval);
          playerCube.position.y += (playerCube.velocity.y * interval);
          playerCube.position.z += (playerCube.velocity.z * interval);

          //playerCube.pastRotation.x = playerCube.rotation.x;
          //playerCube.pastRotation.y = playerCube.rotation.y;
        }else{
          console.log('stopped moving')
          playerCube.velocity.x = 0;
          playerCube.velocity.y = 0;
          playerCube.velocity.z = 0;
          playerCube.moving = false;
        }
        playerCube.lastTween = performance.now();

    }
  };


  playerCube.update = function(){
    playerCube.tweenedMove();
  };


  objects.push( playerCube );
  scene.add( playerCube );


};


var removePlayer = function(ID){

  var player = scene.getObjectByName('player-'+ID);
  scene.remove(player);

};

var translatePlayer = function(ID, translation){
  console.log('trans', ID, translation);

  var player = scene.getObjectByName('player-'+ID);


  player.position.x = translation.position.x;
  player.position.y = translation.position.y;
  player.position.z = translation.position.z;

  // TODO: Euler Angles must be applied to other players before x rotation can be synced
  // player.rotation.x = translation.rotation.x;

  player.rotation.y = translation.rotation.y;

};

var translatePlayerTweened = function(ID, translation){

  var player = scene.getObjectByName('player-'+ID);

  if (!player.moving){
    player.moving = true;
    player.velocity.x = (translation.position.x - player.position.x)/(socketInterval);
    player.velocity.y = (translation.position.y - player.position.y)/(socketInterval);
    player.velocity.z = (translation.position.z - player.position.z)/(socketInterval);
    console.log('vel',player.velocity);
    //player.toRotate.y = translation.rotation.y;

    player.lastTween = performance.now();
    player.lastServerUpdate = performance.now();
  }
};

playerEvents.addListener('new_player', createPlayerCube);

playerEvents.addListener('remove_player', removePlayer);

playerEvents.addListener('translate_other_player', translatePlayer);

playerEvents.addListener('translate_other_player_tweened', translatePlayerTweened);


