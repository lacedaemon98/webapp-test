<template>
  <v-app>
    <b-container>
    <div class="d-flex justify-center">
      <h1 id="addTodo">Add Pokemon </h1>
    </div>
    <div class="d-flex justify-center">
      <b-row>
      <b-col md="4" style="margin: 0px auto;">
        <v-text-field v-model="name" label="Name" ></v-text-field>
      </b-col>
      <b-col md="4" style="margin: 0px auto;">
        <v-text-field v-model="type" label="Type" ></v-text-field>
      </b-col>
      <b-col md="4" style="margin: 0px auto;">
        <v-text-field v-model="status" label="Status" ></v-text-field>
      </b-col>
    </b-row>
    </div>
    <div class="d-flex justify-center">
      <b-button @click="addPokemon()" variant="primary">Add Pokemon</b-button>
    </div>


<!-- completed todos -->
<div class="d-flex justify-center" style="margin-top:30px">
  <h1>Pokemon List</h1>

</div>
<div v-for="pokemon in pokemons" :key="pokemon._id" style>
  <b-card style="margin-bottom:20px" >
    <b-row>
      <b-col md="9">
    Name: {{ pokemon.name }} <br>
    Type: {{pokemon.type}} <br>
    Status: {{pokemon.status}}
  </b-col>
  <b-col md="1">

        <b-button @click="updatePokemon(pokemon._id, pokemon.name, pokemon.type, pokemon.status)" class="mx-2" small
        variant="success"> Update </b-button>

    </b-col>
  <b-col md="1">

        <b-button @click="deletePokemon(pokemon._id)" class="mx-2" small
        variant="danger"> Delete </b-button>

    </b-col>
    </b-row>
  </b-card>
</div>

<div>


  <b-modal v-model="modalShow" title="Update Pokemon"  @ok="confirmUpdate">
    <form ref="form" >

      <b-form-group
        label="ID"
        label-for="id-input"
        invalid-feedback="ID is required"
      >
        <b-form-input
          id="id-input"
          v-model="updateID"
          required readonly
        ></b-form-input>
      </b-form-group>

        <b-form-group
          label="Name"
          label-for="name-input"

        >
          <b-form-input
            id="name-input"
            v-model="updateName"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Type"
          label-for="type-input"

        >
          <b-form-input
            id="type-input"
            v-model="updateType"

          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Type"
          label-for="type-input"
        >
          <b-form-input
            id="type-input"
            v-model="updateStatus"
          ></b-form-input>
        </b-form-group>
      </form>
  </b-modal>
</div>
</b-container>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    name: "",
    type: "",
    status: "",
    pokemons: [],
    pokedex: "",
    modalShow: false,
    updateID:"",
    updateName:"",
    updateType:"",
    updateStatus:""
  }),
  methods: {
    addPokemon() {
      axios.post("https://bx9puo0e9i.execute-api.us-east-1.amazonaws.com/dev/api/pokemons", {
        name: this.name,
       type: this.type,
       status: this.status
    }).then(response => {
      this.message = response.data;
      this.getPokemons();
      this.name ="";
      this.type="";
      this.status ="";




    });

  },

  deletePokemon(pokemonID) {
    axios.delete("https://bx9puo0e9i.execute-api.us-east-1.amazonaws.com/dev/api/pokemons/" + pokemonID).then(response => {
      console.log(response.data);
      this.getPokemons();
  });

},

updatePokemon(pokemonID, pokemonName, pokemonType, pokemonStatus) {
  this.modalShow= true;
  this.updateID = pokemonID;
  this.updateName = pokemonName;
  this.updateType = pokemonType;
  this.updateStatus = pokemonStatus;

},
confirmUpdate(){
  axios.put("https://bx9puo0e9i.execute-api.us-east-1.amazonaws.com/dev/api/pokemons/" + this.updateID , {
    name: this.updateName,
   type: this.updateType,
   status: this.updateStatus
}).then(response => {
  this.message = response.data;
  this.getPokemons();
  this.updateID ="";
  this.updateName ="";
  this.updateType="";
  this.updateStatus ="";




});

},


  getPokemons(){
    axios.get("https://bx9puo0e9i.execute-api.us-east-1.amazonaws.com/dev/api/pokemons")
    .then(response => (this.pokemons = response.data.data))
    .catch(error => console.log(error));

    }
},
created() {
  this.getPokemons();

}
}
</script>
