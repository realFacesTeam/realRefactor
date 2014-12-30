var createPlayerCube = function(ID){

  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var playerCube = new THREE.Mesh( geometry, material );

  playerCube.name = 'player-' + ID;
  console.log('creating playerCube-', playerCube.name)
  playerCube.position.y += 10;

  scene.add( playerCube );

};

var removePlayer = function(ID){

  var player = scene.getObjectByName('player-'+ID);
  scene.remove(player);

}

var translatePlayer = function(ID, translation){

  var player = scene.getObjectByName('player-'+ID);

  player.translateX(translation.position.x - player.position.x);
  player.translateY(translation.position.y - player.position.y);
  player.translateZ(translation.position.z - player.position.z);

  // player.rotation.x = translation.rotation.x;
  // player.rotation.y = translation.rotation.y;

}

playerEvents.addListener('new_player', createPlayerCube)

playerEvents.addListener('translate_other_player', translatePlayer)


