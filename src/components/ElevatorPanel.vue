<template>
      <v-flex xs3>
        <v-card >
          <v-toolbar color="teal" dark>
            <v-toolbar-title class="headline text-uppercase">
              <span>ID: </span>
              <span class="font-weight-light">{{ID}}</span> <br>
              <span class="font-weight-light"> status: {{status}} </span> 
              
            </v-toolbar-title>  
              
          </v-toolbar>
            <v-list two-line>
               <v-list-tile 
                  v-for="item in items"
                  :key ="item.title"
                >
                 <v-list-tile-content>
                    <v-list-tile-title >{{item.title}}</v-list-tile-title>
                    <v-list-tile-sub-title >{{item.subtitle}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                      <v-icon  large v-bind:color="item.color[data[item.title]]">{{item.icon[data[item.title]]}}</v-icon>
                  </v-list-tile-action>
               </v-list-tile>
            </v-list>      
          </v-card>
        </v-flex>    
</template>

<script>
import { clearInterval } from 'timers';
  export default {
    props: ['data','ID','status','lastconnectiontime'],          
    data:function (){
      return{     
        
        items:[
          {
            icon    :['looks_one','looks_one'],
            color   :['green','green lighten-1'],
            title   :'P100' ,
            subtitle:'Kat'
          },
          {
            icon:['code','code'],
            color:['grey lighten-1','green'],
            title:'P101',
            subtitle:'Kapı durumu'
          },
          {
            icon:['transfer_within_a_station','transfer_within_a_station'],color:['grey lighten-1','green lighten-1'],title:'P102', subtitle:'Kapı fotosel sensörü'},
          {
            icon:['whatshot','whatshot'],color:['grey lighten-1','red'],title:'P103', subtitle:'Yangın Senssörü'},
          {
            icon:['priority_high','priority_high'],color:['grey lighten-1','red'],title:'P104', subtitle:'Deprem Sensörü'},
          {
            icon:['build','build'],color:['grey lighten-1','red'],title:'P105', subtitle:'Arıza'},
          {
            icon:['check_circle','error'],color:['green','red'],title:'P106', subtitle:'Durum'},
          {
            icon:['priority_high','priority_high'],color:['grey lighten-1','red'],title:'P107', subtitle:'Aşırı Yük'},
          {
            icon:['arrow_downward','arrow_upward'],color:['green lighten-1','green lighten-1'],title:'P108', subtitle:'Kabin Yönü'},
          {
            icon:['power','power_off'],color:['green','grey lighten-1'],title:'P109', subtitle:'Güç'}
        ]
      }
    },
    watch: {
    status: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
      if (val=='1'){
      console.log('keeping CAR'+ this.ID+' a live');
      setTimeout(() => {
      this.$emit('reset-status', this.ID);
      //this.status='0';
        }, 4000);
      }


    }},
    methods: {
     keepalive: function() {
      console.log('keeping CAR'+ this.ID+' a live');
      setTimeout(() => {
      this.$emit('reset-status', this.ID);
      //this.status='0';
      console.log("the status from elevatorpanel"+this.status);
        }, 4000);


    }
    
    },
    mounted() {
 
      // setInterval(() => {
      //   //every second checks the status of the elevator
      //   //console.log(" printing from elevatorpanel :" +"id :"+this.ID+" status:" +this.status);
      // if(this.status=='1'){
      // //if it is alive then check after 4 seconds ,change the status to offilne if no other signal comes
      // setInterval(() => {
      //   //make it =0 in 4 seconds 
      // this.$emit('reset-status', this.ID);
      // this.status=0;
      //   }, 4000);
      // }
      // }, 1000);
     

  }
    
}

</script>

<style>
.icon__flip {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}
</style>
