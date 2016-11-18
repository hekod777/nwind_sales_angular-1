angular.module('salesAngular')
  .controller('homeCtrl', function($scope){

  $scope.disableOpenRoom = false;
  $scope.disableJoinRoom = false;
  $scope.disableOpenJoin = false;
  $scope.tags = [];
  //$scope.broadcasting = false;
  //$scope.watching = false;


  // ......................................................
  // .......................UI Code........................
  // ......................................................
  var connection = new RTCMultiConnection();
  //free signal server
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  // connection.socketURL = '/rtcmulticonnection-v3/server.js';
  connection.enableFileSharing = true; // by default, it is "false".
  connection.session = {
    audio: true,
    video: true,
    data: true
  };
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
  };


  var videoContainer = document.getElementById('video-container');

  // connection.onstream = function(event) {
  //   //document.body.appendChild(event.mediaElement);

  //   var div = document.createElement('div');
  //   div.className = 'video-div';
  //   div.appendChild(event.mediaElement);

  //   var h2= document.createElement('h2');
  //   h2.innerHTML = event.extra.tags;
  //   div.appendChild(h2);

  //   videoContainer.appendChild(div);

  // };

  var localVideoContainer = document.getElementById('local-video-container');

  var remoteVideoContainer = document.getElementById('remote-video-container');

  connection.onstream = function(event) {
    //document.body.appendChild(event.mediaElement);

    // var div = document.createElement('div');
    // div.className = 'video-div';
    // div.appendChild(event.mediaElement);

    // var h2= document.createElement('h2');
    // h2.innerHTML = event.extra.tags;
    // div.appendChild(h2);

    // videoContainer.appendChild(div);

    var video = event.mediaElement;

    // if(event.type === 'local'){
    //   var div = document.createElement('div');
    //   div.className = 'video-div';
    //   div.appendChild(event.mediaElement);

    //   // var h2= document.createElement('h2');
    //   // h2.innerHTML = event.extra.tags;
    //   // div.appendChild(h2);

    //   localVideoContainer.appendChild(div);      
    //  }

     if(event.type==='remote'){
      var div = document.createElement('div');
      div.className = 'video-div';
      div.appendChild(event.mediaElement);

      var h2= document.createElement('h2');
      h2.innerHTML = event.extra.tags;
      div.appendChild(h2);

      remoteVideoContainer.appendChild(div);   
     }



  };





  // read it !! rtcmulticonnection.onstream event





  connection.extra = {
    category:'',
    tags:[],
  }



  $scope.addTag = function (){
    connection.extra.tags.push($scope.tag);
    $scope.tag = null;
    $scope.tags = connection.extra.tags;
    console.log(connection.extra.tags);

  }




  // document.getElementById('open-room').onclick = function() {
  //   this.disabled = true;
  //   connection.open(document.getElementById('room-id').value);
  // };

  $scope.openRoom = function() {

  connection.session = {
    audio: true,
    video: true,
    data: true,
    broadcast:true,
    oneway:true,
  };



    $scope.disableOpenRoom = true;
    connection.open($scope.roomname);
    $scope.broadcasting = true;
    //$scope.watching = false;
  };

  $scope.joinRoom = function() {
    $scope.disableJoinRoom = true;
    connection.join($scope.roomname);
    $scope.broadcasting = false;
    //$scope.watching = true;
  };

  $scope.joinOpen = function() {
    $scope.disableOpenJoin = true;
    connection.openOrJoin($scope.roomname);
  };





  // ......................................................
  // ................FileSharing/TextChat Code.............
  // ......................................................
  // document.getElementById('share-file').onclick = function() {
  //   var fileSelector = new FileSelector();
  //   fileSelector.selectSingleFile(function(file) {
  //     connection.send(file);
  //   });
  // };
  
  // document.getElementById('input-text-chat').onkeyup = function(e) {
  //   if (e.keyCode != 13) return;

  //   // removing trailing/leading whitespace
  //   this.value = this.value.replace(/^\s+|\s+$/g, '');
  //   if (!this.value.length) return;

  //   connection.send(this.value);
  //   appendDIV(this.value);
  //   this.value = '';
  // };
  // var chatContainer = document.querySelector('.chat-output');

  // function appendDIV(event) {
  //   var div = document.createElement('div');
  //   div.innerHTML = event.data || event;
  //   chatContainer.insertBefore(div, chatContainer.firstChild);
  //   div.tabIndex = 0;
  //   div.focus();

  //   document.getElementById('input-text-chat').focus();
  // }
  // ......................................................
  // ..................RTCMultiConnection Code.............
  // ......................................................
  
  // connection.onmessage = appendDIV;

});
