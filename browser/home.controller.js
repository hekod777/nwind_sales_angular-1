angular.module('salesAngular')
  .controller('homeCtrl', function($scope){

  // ......................................................
  // .......................UI Code........................
  // ......................................................
  document.getElementById('open-room').onclick = function() {
    this.disabled = true;
    connection.open(document.getElementById('room-id').value);
  };
  document.getElementById('join-room').onclick = function() {
    this.disabled = true;
    connection.join(document.getElementById('room-id').value);
  };
  document.getElementById('open-or-join-room').onclick = function() {
    this.disabled = true;
    connection.openOrJoin(document.getElementById('room-id').value);
  };
  // ......................................................
  // ................FileSharing/TextChat Code.............
  // ......................................................
  document.getElementById('share-file').onclick = function() {
    var fileSelector = new FileSelector();
    fileSelector.selectSingleFile(function(file) {
      connection.send(file);
    });
  };
  document.getElementById('input-text-chat').onkeyup = function(e) {
    if (e.keyCode != 13) return;

    // removing trailing/leading whitespace
    this.value = this.value.replace(/^\s+|\s+$/g, '');
    if (!this.value.length) return;

    connection.send(this.value);
    appendDIV(this.value);
    this.value = '';
  };
  var chatContainer = document.querySelector('.chat-output');

  function appendDIV(event) {
    var div = document.createElement('div');
    div.innerHTML = event.data || event;
    chatContainer.insertBefore(div, chatContainer.firstChild);
    div.tabIndex = 0;
    div.focus();

    document.getElementById('input-text-chat').focus();
  }
  // ......................................................
  // ..................RTCMultiConnection Code.............
  // ......................................................
  var connection = new RTCMultiConnection();
  //free signal server
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  // connection.socketURL = 'rtcmulticonnection-v3/server.js';
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
  connection.onstream = function(event) {
    document.body.appendChild(event.mediaElement);
  };
  connection.onmessage = appendDIV;

});
