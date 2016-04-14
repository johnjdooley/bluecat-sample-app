/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {

    bluecat_watch_beacons_success:function(watchData){
        var beacons=watchData.filteredMicroLocation.beacons;
        var proximity=beacons[0]['proximity'];
        var distance=beacons[0]['accuracy'];
        var serialNumber=beacons[0]['serialNumber'];

        var parentElement=document.getElementById('beaconData');
        var distanceElement = parentElement.querySelector('.distance');

        var className='cold';

        switch(proximity){
          case 'BC_PROXIMITY_IMMEDIATE':
               className='boiling';
          break;
          case 'BC_PROXIMITY_NEAR':
                className='warm';
          break;
          case 'BC_PROXIMITY_FAR':
                className='cold';
          break;
          default:
               className='outofrange';

        };

        document.getElementsByClassName('app')[0].setAttribute('class', 'app '+className);

        distanceElement.innerText=distance;

    },

    bluecat_watch_beacons_exit:function(watchData){

        var parentElement=document.getElementById('beaconData');
        var rangeElement = parentElement.querySelector('.range');
        var distanceElement = parentElement.querySelector('.distance');

        document.getElementsByClassName('app')[0].setAttribute('class', 'app outofrange');

        distanceElement.innerText='N/A';



    },

    bluecat_success:function() {
        alert('Beacon listening');
        //Start watching beacons using com.bluecats.beacons.watchEnterBeacon etc.
        app.start_watching_beacons();
    },

    bluecat_error:function() {
        alert('Error!!!');
        //Start watching beacons using com.bluecats.beacons.watchEnterBeacon etc.
    },

    init_bluecat:function(){

         var sdkOptions = {
            trackBeaconVisits:true, //Log visits to beacons to the BlueCats api
            useLocalStorage:true, //Cache beacons in local db for offline availability
            cacheAllBeaconsForApp:true, //Cache all beacons on startup
            discoverBeaconsNearby:true, //Cache beacons as detected by the device
            cacheRefreshTimeIntervalInSeconds:300 //Period to check for changes in seconds
        };

        com.bluecats.beacons.startPurringWithAppToken('', this.bluecat_success, this.bluecat_error, sdkOptions);


    },

    start_watching_beacons:function(){
          var beaconWatchOptions = {
            minimumTriggerIntervalInSeconds:2, //Integer. Minimum seconds between callbacks (default 1)
            //repeatCount:3, //Integer. Default repeat infinite
            //secondsBeforeExitBeacon:5,
              filter:{
                minimumProximity:'BC_PROXIMITY_IMMEDIATE', //String. Closest proximity to include. Default BC_PROXIMITY_IMMEDIATE
                maximumProximity:'BC_PROXIMITY_UNKNOWN', //String. Furthest proximity to include. Default BC_PROXIMITY_UNKNOWN
          //      minimumAccuracy:0, //Number. Minimum distance in metres (Default 0)
            //      maximumAccuracy:0.5, //Number. Maximum distnace in metres (Default unrestricted)
           //       sitesNamed:['Site1','Another Site'],//Array of string. Only include beacons in specified sites
             //     categoriesNamed:['Entrance','Another Category']   //Array of string. Only include beacons in specified categories

              }
          };


         var watchID = com.bluecats.beacons.watchEnterBeacon(this.bluecat_watch_beacons_success,
                                                                 this.bluecat_error,
                                                                 beaconWatchOptions);

         watchID = com.bluecats.beacons.watchMicroLocation(this.bluecat_watch_beacons_success,
                                                                 this.bluecat_error,
                                                                 beaconWatchOptions);

         watchID = com.bluecats.beacons.watchExitBeacon(this.bluecat_watch_beacons_exit,
                                                                 this.bluecat_error,
                                                                 beaconWatchOptions);


    },


    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        app.init_bluecat();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    }
};

app.initialize();