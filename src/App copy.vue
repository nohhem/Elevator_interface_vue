<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>ELAWATCHER </span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="#"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>                 
         <!-- <ElevatorPanel v-for="(clientID,i) in clientIDs" :key=i :data="clients[i]" :ID="clientID"/> -->
         <ElevatorPanel ref="elv0" :data="client.CAR01" :ID="clientIDs[0]" :status="status[0]"/>
         <ElevatorPanel ref="elv1" :data="client.CAR02" :ID="clientIDs[1]"/>
         <ElevatorPanel ref="elv2" :data="client.CAR03" :ID="clientIDs[2]"/>
         <ElevatorPanel ref="elv3w" :data="client.CAR04" :ID="clientIDs[3]"/>
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
      status:String,
      broker: new Paho.Client('broker.mqttdashboard.com', 8000, 'user1x'),
      clientIDs:['CAR01','CAR02','CAR03','CAR04'],
      status:['0','0','0','0'],
      client:{
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
      //put mesasge on the title borker not availble
    },
    onMessageArrived : function (message) {
     // alert(message.payloadString)  
      try {       
        var obj = JSON.parse(message.payloadString);
        var i = this.clientIDs.indexOf(obj.ID);
        
        console.log('recieved message from broker with case '+i);
       switch (i) {
         case 0:
           //this.client.status[0]=1;
           this.client['CAR01'] = obj
           vm.$refs.elv0.keepalive();
           console.log('keeping car01 alive');
           break;
           case 1:
           this.client['CAR02'] = obj;
           break;
            case 2:
           this.client['CAR03'] = obj;
           break;
            case 3:
           this.client['CAR04'] = obj;
           break;
         default:
           break;
       }
        //if(i<4)
        //var s='CAR01';
          
      }
      catch(e){
        console.error(e);
      }
    },
    onConnect:function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      this.broker.subscribe('remote/elevators/iga/#');
      this.status= 'connected'
    },
    onFailure:function() {    
      alert('Can not connect')
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
