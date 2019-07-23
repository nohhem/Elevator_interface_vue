<template>
      <v-flex xs3>
        <v-card >
       
          <v-toolbar  dark  >
            <v-toolbar-title class="headline text-uppercase">
              <span>ID: </span>
              <span class="font-weight-light">{{ID}}</span>              
            </v-toolbar-title>          
            <v-spacer></v-spacer>  
              <v-icon large :color="s_color[status]" :class="status?'':'blink'">{{s_icon[status]}}</v-icon>                        
          </v-toolbar>
         
            <v-list two-line>
               <v-list-tile 
                  v-for="item in items"
                  :key ="item.title"
                >
                 <v-list-tile-content dim>
                    <v-list-tile-title >{{item.title}}</v-list-tile-title>
                    <v-list-tile-sub-title >{{item.subtitle}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                      <v-icon class="material-icons-outlined" x-large v-bind:color="status?item.color[data[item.title]]:'grey'">{{item.icon[data[item.title]]}}</v-icon>
                  </v-list-tile-action>
               </v-list-tile>
               
            </v-list>      
          </v-card>
           
        </v-flex>    
</template>

<script>
  export default {
    props: ['data','ID'],          
    data:function (){
      return{
        timer:null,
        status:0,
        s_icon    :['cast','cast_connected'],
        s_color   :['red','light-green accent-3'],   
        items:[
          {
            icon    :['mdi-numeric-0-box','mdi-numeric-1-box'],
            color   :['green','green'],
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
            icon:['build','build'],color:['grey lighten-1','yellow  darken-1'],title:'P105', subtitle:'Arıza'},
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

    methods: {
      keepAlive: function() {
        this.status=1;
        console.log('keeping '+ this.ID+' alive ');
        clearTimeout(this.timer);
        this.timer=setTimeout(
          () => {
            this.status=0;
            console.log("The conecction to the " + this.ID +"  LOST ");
          }, 
          5000); // 5 sn
      }
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

  .blink {
      animation: blink 2s steps(5, start) infinite;
      -webkit-animation: blink 1s steps(5, start) infinite;
    }
    @keyframes blink {
      to {
        visibility: hidden;
      }
    }
    @-webkit-keyframes blink {
      to {
        visibility: hidden;
      }
    }
</style>
