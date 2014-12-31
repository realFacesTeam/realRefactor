var createPlayerCube = function(ID, createTranslation){
  console.log(ID, createTranslation)

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

  scene.add( playerCube );

  // if(createTranslation)
  //   translatePlayer(ID, createTranslation);

};


var removePlayer = function(ID){

  var player = scene.getObjectByName('player-'+ID);
  scene.remove(player);

}

var translatePlayer = function(ID, translation){
  console.log('trans', ID, translation);

  var player = scene.getObjectByName('player-'+ID);

  // player.translateX(translation.position.x - player.position.x);
  // player.translateY(translation.position.y - player.position.y);
  // player.translateZ(translation.position.z - player.position.z);

  player.position.x = translation.position.x;
  player.position.y = translation.position.y
  player.position.z = translation.position.z

  player.rotation.x = -translation.rotation.x;
  player.rotation.y = translation.rotation.y;

}

playerEvents.addListener('new_player', createPlayerCube)

playerEvents.addListener('remove_player', removePlayer)

playerEvents.addListener('translate_other_player', translatePlayer)


