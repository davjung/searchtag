<template>
  <div id="home">
    <div id="leftSide">
      <div id="leftContent">
        <h2 style="text-align:left">Tags</h2>

        <div id="schoolList" style="text-align:left">
          <input type="checkbox" id="wcas" value="WCAS" v-model="checkedSchools">
          <label for="wcas">Weinberg College of Arts and Sciences</label>
          <br>
          <input type="checkbox" id="mccormick" value="McCormick" v-model="checkedSchools">
          <label for="mccormick">McCormick School of Engineering and Applied Science</label>
          <br>
          <input type="checkbox" id="medill" value="Medill" v-model="checkedSchools">
          <label for="medill">Medill School of Music</label>
          <br>
          <input type="checkbox" id="comm" value="Comm" v-model="checkedSchools">
          <label for="comm">School of Communication</label>
          <br>
          <input type="checkbox" id="sesp" value="SESP" v-model="checkedSchools">
          <label for="sesp">School of Education and Social Policy</label>
          <br>
          <input type="checkbox" id="bienen" value="Bienen" v-model="checkedSchools">
          <label for="bienen">Bienen School of Music</label>
          <br>
          <input type="checkbox" id="sps" value="SPS" v-model="checkedSchools">
          <label for="sps">School of Professional Studies</label>
          <br>
          <br>

          <span>Checked schools: {{ checkedSchools }}</span>
        </div>

      </div>
    </div>

    <div id="rightSide">
      <div id="rightContent">
        
      </div>
    </div>

  </div>
</template>

<script>
import card from './card'

export default {
  name: 'home',
  components: {
    card
  },
  data () {
    return {
      checkedSchools: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

#home {
  width: 90%;
  height: 1000px;
  margin: 0 auto;
}

#leftSide{
  width: 250px;
  background: LightGray;
  height: 1000px;
  float: left;
  border: 1px solid
}

#rightSide {
  margin-left: 250px;
  height: 1000px;
  border: 1px solid;
}

#leftContent {
  margin: 10%;
  height: 80%;
  /* background: red; */
}
#rightContent {
  margin: 25px;
  /* background: red; */
  height: 80%;
}

</style>
