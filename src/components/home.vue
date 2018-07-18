<template>
  <div id="home">
    <div id="leftSide">
      <div id="leftContent">
        
        <div id="searchWrapper">
          <h2 style="text-align:left">Search</h2>
          <div id="search">
            <div class="search-form searchblox">
              <form>
                <input style="width:70%" type="text" id="myInput" class="form-control" autocomplete="off" placeholder="Student" v-on:keyup="updateValidStudents()">
              </form>
            </div>
          </div>
        </div>
        <br>

        <div id="tags">
          <h2 style="text-align:left">Tags</h2>
          <div id="schoolList" style="text-align:left">
            <input type="checkbox" id="wcas1" value="WCAS" v-model="checkedSchools">
            <label for="wcas">Weinberg College of Arts and Sciences </label>
            <span id="WCAS">(0)</span>
            <br>
            <input type="checkbox" id="mccormick1" value="McCormick" v-model="checkedSchools">
            <label for="mccormick">McCormick School of Engineering and Applied Science </label>
            <span id="McCormick">(0)</span>
            <br>
            <input type="checkbox" id="medill1" value="Medill" v-model="checkedSchools">
            <label for="medill">Medill School of Music </label>
            <span id="Medill">(0)</span>
            <br>
            <input type="checkbox" id="comm1" value="Comm" v-model="checkedSchools">
            <label for="comm">School of Communication </label>
            <span id="Comm">(0)</span>
            <br>
            <input type="checkbox" id="sesp1" value="SESP" v-model="checkedSchools">
            <label for="sesp">School of Education and Social Policy </label>
            <span id="SESP">(0)</span>
            <br>
            <input type="checkbox" id="bienen1" value="Bienen" v-model="checkedSchools">
            <label for="bienen">Bienen School of Music </label>
            <span id="Bienen">(0)</span>
            <br>
            <input type="checkbox" id="sps1" value="SPS" v-model="checkedSchools">
            <label for="sps">School of Professional Studies </label>
            <span id="SPS">(0)</span>
          </div>
        </div>
      </div>
    </div>

    <div id="rightSide">
      <div id="rightContent">
        <h2 style="text-align:left">Students</h2>        
        <div v-if="validStudents.length == 0" style="height:100%">- No students in these schools -</div>
        <div id="cards">
          <card
            v-for="stu in validStudents"
            v-bind:key="stu.id"
            v-bind:studentData = "stu"
            v-bind:dataMap = dm
          ></card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

const log = function (l) {
   console.log(l);
}

import card from './card'
import * as sch from '../assets/schools.json'

export default {
  name: 'home',
  components: {
    card
  },
  data () {
    return {
      dm: {
        name: "fullName",      // first name, last name string
        mail: "email",         // email string
        phone: "phone",        // phone number
        image: "img",          // picture url
        title: "title",        // title string
        schoolStr: "schoolStr" // string with all schools listed
      },
      checkedSchools: [],
      students: [],
      validStudents: [],
      schoolsList: [],
    }
  },

  mounted() {
    this.createSchools();
    this.createData(); // get student data from API, add .schools[]
  },

  watch: {
    checkedSchools: function() {
      this.updateValidStudents();
      this.tagCount();
    }
  },

  methods: {

    createSchools: function() { // initialize this.schoolsList[]
      this.schoolsList = sch[0];
    },

    createData: function() { // get student data from API, add .schools[], fix name to first + last
      let t = [];

      this.axios.get('https://randomuser.me/api/?results=50&inc=name,gender,phone,email,picture&noinfo')
      .then(response => {
        const r = response.data.results;
        
        r.forEach(stu => {
          t.push(stu);
        })

        t.forEach(stu => { //foreach student
          stu.schools = [];
          const schoolNum = Math.floor(Math.random() * 2) + 1; // random, 1 or 2 schools

          for (let i = 0; i<schoolNum; i++) {   // what school(s) do you go to? (.schools[])
            let code = Math.floor(Math.random() * 7) + 1;
            if (!stu.schools.includes(this.schoolCode(code))) {
              stu.schools.push(this.schoolCode(code));
            }
          }
          let x = stu.name.first.concat(" ").concat(stu.name.last)
          stu.fullName = x;

          let img = stu.picture.large;
          stu.img = img;


        })

        this.students = this.schoolString(t);
        this.tagCount();
        this.updateValidStudents();
      })

  

    },

    schoolCode: function(code) { // randomized value is assigned to school when creating data
      if (code > 7){return "invalid code"}
      else {
        if (code == 1) {return "WCAS"}
        if (code == 2) {return "McCormick"}
        if (code == 3) {return "Medill"}
        if (code == 4) {return "Comm"}
        if (code == 5) {return "SESP"}
        if (code == 6) {return "Bienen"}
        if (code == 7) {return "SPS"}        
      }
    },

    schoolString: function(t) { // convert schools[] into a string value for display
      t.forEach(s => {
        s.schoolStr = '';
        s.schools.forEach(sc => {
          s.schoolStr = s.schoolStr.concat(sc).concat(", ");
        })
        s.schoolStr = s.schoolStr.slice(0, -2);
      })
      return t;
    },

    updateValidStudents: function() { //filter out students that don't match searchbar or tags
      this.validStudents = [];
      let i = document.getElementById("myInput").value.toUpperCase();
      this.students.forEach(s => {
        let marker = 1;
        let name = s.name.first.concat(" ").concat(s.name.last);
        
        this.checkedSchools.forEach(sc => {  // if student is not in all of the checked schools, cut
          if (!s.schools.includes(sc)) {marker = 0;}
        })

        if (name.toUpperCase().indexOf(i) == -1) {marker = 0;} //if input doesn't index on your name, cut
        if (marker == 1) {this.validStudents.push(s);}
      })  
    },

    findValidStudents: function() { //return valid students without touching validStudents[]
      let v = [];
      this.students.forEach(s => {
          let marker = 1;
          this.checkedSchools.forEach(sc => {
            if (!s.schools.includes(sc)) {marker = 0;}
          })
          if (marker == 1) {v.push(s);}
      })
      return v;
    },
    
    tagCount: function() { // find # of students, for each school, that are in validStudents[]
      const v = this.findValidStudents();
      this.schoolsList.forEach(school => {
        let n = 0;
        v.forEach(student => {
          if (student.schools.includes(school.code)) {
            n++;
          }
        })
        document.getElementById(school.code).innerHTML = "(" + n + ")";
      })
    },
  }
}
</script>


<style scoped>
  @import '../assets/css/print.css';
  @import '../assets/css/styles.css';


  h1, h2 {
    font-weight: normal;
  }
  a {
    color: #42b983;
  }

  #home {
    margin: 0 auto;
  }

  #leftSide{
    width: 250px;
    background: LightGray;
    float: left;
    border: 1px solid;
    height: 100vh;

  }

  #rightSide {
    margin-left: 250px;
    border: 1px solid;
    height: 100vh;
    overflow: scroll;
  }

  #leftContent {
    margin: 10%;
    height: 100%;
    /* background: red; */
  }
  #rightContent {
    margin: 25px;
    /* background: red; */
    height: 80%;
  }

  #schoolList label {
    display: inline;
  }

  #home {
    position: relative;
    height: 100vh;
  }


</style>
