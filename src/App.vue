<template>
  <v-app>

    <v-snackbar v-model="showInfo" :timeout=5000 top :color="connected?'green':'red'"> {{status}} </v-snackbar>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>ELAWATCHER </span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="#" >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>                 
         <!-- <ElevatorPanel v-for="(clientID,i) in clientIDs" :key=i :data="clients[i]" :ID="clientID"/> -->
         <ElevatorPanel :data="clients['CAR01']" :ID="clientIDs[0]" ref="CAR01"/>
         <ElevatorPanel :data="clients['CAR02']" :ID="clientIDs[1]" ref="CAR02"/>
         <ElevatorPanel :data="clients['CAR03']" :ID="clientIDs[2]" ref="CAR03"/>
         <ElevatorPanel :data="clients['CAR04']" :ID="clientIDs[3]" ref="CAR04"/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ElevatorPanel from './components/ElevatorPanel'
import Paho from 'paho-mqtt'

export default {
  name: 'App',
  components: {
    ElevatorPanel
  },
  data () {
    return {
      showInfo:false,
      connected:false,
      status:String,
      broker: new Paho.Client('broker.mqttdashboard.com', 8000, 'clientId-isTfNMk9qT'),
      clientIDs:['L666','L667','L668','L669'],
      clients:{
        CAR01: {'P100':0,'P101':0,'P102':0,'P103':0,'P104':0,'P105':0,'P106':0,'P107':0,'P108':0,'P109':0}, 
        CAR02: {'P100':0,'P101':0,'P102':0,'P103':0,'P104':0,'P105':0,'P106':0,'P107':0,'P108':0,'P109':0},
        CAR03: {'P100':0,'P101':0,'P102':0,'P103':0,'P104':0,'P105':0,'P106':0,'P107':0,'P108':0,'P109':0},
        CAR04: {'P100':0,'P101':0,'P102':0,'P103':0,'P104':0,'P105':0,'P106':0,'P107':0,'P108':0,'P109':0}, 
        },
    }
  },
  methods: {
    onConnectedLost : function(responseObject){  
      console.log("onConnectionLost:"+responseObject.errorMessage);
      this.status = 'Bağlantı Koptu'
      this.connected= false
      this.showInfo = true
    },
    onMessageArrived : function (message) {
     // alert(message.payloadString) 
     // {"ID":"L666","P100":1,"P101":1,"P102":0,"P103":0,"P104":0,"P105":0,"P106":0,"P107":0,"P108":0,"P109":0} 
     console.log("onMessageArrived:"+message.payloadString);
      try {       
        var obj = JSON.parse(message.payloadString);
        var i = this.clientIDs.indexOf(obj.ID) +1;
        console.log("ID:"+obj.ID + "index " + i);
        this.clients['CAR0'+i] = obj;
        this.$refs ['CAR0'+i].keepAlive();
      
      }
      catch(e){
        //console.error(e);
      }
    },
    onConnect:function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      this.status = 'Bağlantı Kuruldu'
      this.broker.subscribe('remote/elevators/iga/#');
      this.connected= true
      this.showInfo= true
      
    },
    onFailure:function() {    
      this.status = 'Bağlantı Hatası'
      this.connected= false
      this.showInfo= true
    }
  },
   created: function() {
    this.broker.connect({
      onSuccess: this.onConnect,
      onFailure: this.onFailure
    });
    this.broker.onConnectedLost = this.onConnectedLost;
    this.broker.onMessageArrived = this.onMessageArrived;    
  }
}
</script>
