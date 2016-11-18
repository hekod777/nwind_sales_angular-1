angular.module('salesAngular')
  .controller('broadcastCtrl', function($scope, BroadCastFactory, channels, $rootScope){
        var socket = io();
        console.log('this loaded');
        console.log(channels);
        $scope.channels = channels;

        $rootScope.broadcasting = false;
        $rootScope.watching = false;


        $scope.disableOpenRoom = false;
        $scope.disableJoinRoom = false;
        $scope.disableOpenJoinRoom = false;
        $scope.extra = {};
        $scope.extra.tags = [];

	        // ......................................................
            // .......................UI Code........................
            // ......................................................




        $scope.dRoom = function(){
            BroadCastFactory.closeRoom($scope.deleteRoomId);
        }


        $scope.addCategory = function(){
            $scope.extra.category = $scope.category;
        }

        $scope.addCoverImage = function(){
            $scope.extra.coverImage = $scope.coverImage;
        }

        $scope.addTag = function(){
            $scope.extra.tags.push($scope.tag);
            $scope.tag = null;
        }

        $scope.openRoom = function() {
            var roomId = $scope.roomname;

            connection.checkPresence($scope.roomname, function(isRoomExist, roomid){
                if (isRoomExist){
                    console.log("room name already exist, please input a new room name");
                    console.log($scope.roomname);
                    $scope.roomname = null;
                }
                else{
                    $rootScope.broadcasting = true;
                    BroadCastFactory.createRoom($scope.roomname, $scope.extra);
                    $rootScope.unwanted = $scope.roomname;

                    $scope.disableOpenRoom = true;
                    connection.sdpConstraints.mandatory = {
                        OfferToReceiveAudio: false,
                        OfferToReceiveVideo: false
                    };
                    connection.open(roomId, function(connect) {
                        console.log(roomId);
                        socket.emit('createRoom', { roomId: roomId, connectId: connect.id})
                        showRoomURL(connection.sessionid);
                    });

                }
            })
        };

        $scope.joinRoom = function(roomname) {
            $scope.disableJoinRoom = true;
            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            };
            $rootScope.watching = true;
            $rootScope.unwatching = roomname;
            BroadCastFactory.increaseView(roomname);
            connection.join(roomname);
        };

        $scope.openJoinRoom = function() {
            $scope.disableOpenJoinRoom = true;
            connection.openOrJoin($scope.roomname, function(isRoomExists, roomid) {
                if(!isRoomExists) {
                    showRoomURL(roomid);
                }
            });
        };


            // ......................................................
            // ..................RTCMultiConnection Code.............
            // ......................................................

            var connection = new RTCMultiConnection();

            // by default, socket.io server is assumed to be deployed on your own URL
            // connection.socketURL = '/';

            // comment-out below line if you do not have your own socket.io server
            connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

            connection.socketMessageEvent = 'video-broadcast-demo';

            connection.session = {
                audio: true,
                video: true,
                oneway: true
            };

            connection.videosContainer = document.getElementById('videos-container');
            connection.onstream = function(event) {
                connection.videosContainer.appendChild(event.mediaElement);
                event.mediaElement.play();
                setTimeout(function() {
                    event.mediaElement.play();
                }, 5000);
            };


            $scope.$on('onBeforeUnload', function (e, confirmation, $scope) {
                confirmation.message = "All data willl be lost.";
                e.preventDefault();
            });
            $scope.$on('onUnload', function (e, $scope) {
                console.log('leaving page'); // Use 'Preserve Log' option in Console
            });



            // connection.onclose = function(e){
            //     BroadCastFactory.createRoom('999');
            // }

            // window.onbeforeunload = function()
            // {
            //     connection.onclose = function(e){
            //         BroadCastFactory.createRoom('999');
            //     };
            //     connection.close();

            // }

            // console.log(window);


            // connection.oniceconnectionstatechange = function(){
            //     if(connection.iceConnectionState == 'disconnected'){
            //         console.log("deadead");
            //     }
            // }
            // function disableInputButtons() {
            //     document.getElementById('open-or-join-room').disabled = true;
            //     document.getElementById('open-room').disabled = true;
            //     document.getElementById('join-room').disabled = true;
            //     document.getElementById('room-id').disabled = true;
            // }

            // ......................................................
            // ......................Handling Room-ID................
            // ......................................................

            function showRoomURL(roomid) {
                var roomHashURL = '#' + roomid;
                var roomQueryStringURL = '?roomid=' + roomid;

                var html = '<h2>Unique URL for your room:</h2><br>';

                html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
                html += '<br>';
                html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';

                var roomURLsDiv = document.getElementById('room-urls');
                roomURLsDiv.innerHTML = html;

                roomURLsDiv.style.display = 'block';
            }

            // (function() {
            //     var params = {},
            //         r = /([^&=]+)=?([^&]*)/g;

            //     function d(s) {
            //         return decodeURIComponent(s.replace(/\+/g, ' '));
            //     }
            //     var match, search = window.location.search;
            //     while ((match = r.exec(search.substring(1))))
            //         params[d(match[1])] = d(match[2]);
            //     window.params = params;
            // })();

            // var roomid = '';
            // if (localStorage.getItem(connection.socketMessageEvent)) {
            //     roomid = localStorage.getItem(connection.socketMessageEvent);
            // } else {
            //     roomid = connection.token();
            // }
            // document.getElementById('room-id').value = roomid;
            // document.getElementById('room-id').onkeyup = function() {
            //     localStorage.setItem(connection.socketMessageEvent, this.value);
            // };

            // var hashString = location.hash.replace('#', '');
            // if(hashString.length && hashString.indexOf('comment-') === 0) {
            //   hashString = '';
            // }

            // roomid = params.roomid;
            // if(!roomid && hashString.length) {
            //     roomid = hashString;
            // }

            // if(roomid && roomid.length) {
            //     document.getElementById('room-id').value = roomid;
            //     localStorage.setItem(connection.socketMessageEvent, roomid);

            //     // auto-join-room
            //     (function reCheckRoomPresence() {
            //         connection.checkPresence(roomid, function(isRoomExists) {
            //             if(isRoomExists) {
            //                 connection.join(roomid);
            //                 return;
            //             }

            //             setTimeout(reCheckRoomPresence, 5000);
            //         });
            //     })();

            //     disableInputButtons();
            // }
  });