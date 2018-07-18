<template>
  <div id="home">
    <div id="leftSide">
      <div id="leftContent">
        
        <div id="search">
          <h2 style="text-align:left">Search</h2>

          <div id="search">
            <div class="search-form searchblox">
              <form>
                <input style="width:70%" type="text" id="myInput" class="form-control" autocomplete="off" placeholder="Student" v-on:keyup="updateValidStudents()">
              </form>
            </div>
          </div>
        
          <div class="dropdown">
            <div id="myDropdown" ref="myDropdown" class="dropdown-content" >
                
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
        <div id="myDropdown" ref="myDropdown" class="dropdown-content" >
          <div v-if="validStudents.length == 0" style="height:100%">- No students in these schools -</div>

          <div id="cards">
            <card
              v-for="stu in validStudents"
              v-bind:key="stu.id"
              v-bind:student = "stu"
            ></card>
          </div>





        </div> 
      </div>
    </div>

  </div>
</template>

<script>

var log = function (l) {
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
      checkedSchools: [],
      students: [],
      validStudents: [],
      schoolsList: [],
    }
  },

  created() {
    this.createData();
    this.createSchools();

  },

  watch: {
    checkedSchools: function() {
      this.updateValidStudents();
      this.tagCount();
    }
  },

  methods: {

    createData: function() {
      var t = [];

      this.axios.get('https://randomuser.me/api/?results=500&inc=name,gender,nat&noinfo')
      .then(response => {
        var r = response.data.results;
        
        r.forEach(element => {
          t.push(element);
        })
        t.forEach(element => {
          element.schools = [];
          var schoolNum = Math.floor(Math.random() * 2) + 1;

          for (var i = 0; i<schoolNum; i++) {
            var code = Math.floor(Math.random() * 7) + 1;
            if (!element.schools.includes(this.schoolCode(code))) {
              element.schools.push(this.schoolCode(code));
            }
          }
        })

        this.students = this.schoolString(t);
        this.tagCount();
        this.updateValidStudents();
      })

  

    },

    schoolCode: function(code) {
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

    updateValidStudents: function() {
      this.validStudents = [];
      
      var i = document.getElementById("myInput").value.toUpperCase();

      this.students.forEach(s => {
        var marker = 1;
        name = s.name.first.concat(" ").concat(s.name.last);

        this.checkedSchools.forEach(sc => {
          if (!s.schools.includes(sc)) {marker = 0;}
        })
        if (name.toUpperCase().indexOf(i) == -1) {marker = 0;}

        if (marker == 1) {this.validStudents.push(s);}

      })  
    },

    schoolString: function(t) {
      t.forEach(s => {
        s.schoolStr = '';
        s.schools.forEach(sc => {
          s.schoolStr = s.schoolStr.concat(sc).concat(", ");

        })
        s.schoolStr = s.schoolStr.slice(0, -2);
      })
      return t;
    },

    tagCount: function() {
      var v = this.validStudentsInternal();
      this.schoolsList.forEach(school => {
        var n = 0;
        v.forEach(student => {
          if (student.schools.includes(school.code)) {
            n++;
          }
        })
        document.getElementById(school.code).innerHTML = "(" + n + ")";
      })
    },

    validStudentsInternal: function() {
      var v = [];
      this.students.forEach(s => {
          var marker = 1;
          this.checkedSchools.forEach(sc => {
            if (!s.schools.includes(sc)) {marker = 0;}
          })
          if (marker == 1) {v.push(s);}
      })
      return v;
    },
    
    createSchools: function() {
      this.schoolsList = sch[0];
    },

    filterFunction: function() {
      var input, filter, a, div, i;
      input = document.getElementById("myInput").value;
      filter = input.toUpperCase();

      div = document.getElementById("myDropdown"); // div of buttons
      a = div.getElementsByTagName("button");      // list of buttons

      for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "block";
        } 
        else {
          a[i].style.display = "none";
        }
        if (filter.length < 2) {
          a[i].style.display = "none";
        }
      }
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

/* #cards {
  position: relative;
  left: 2.5%;
  top: 30px;
} */

/* form {
  text-align: left;
  border: 1px solid white;
  border-radius: 2px;
}

form input {
  position: relative;
  left: 5px;
  font-size: 90%;
  width: 185px;
}

input:focus {
  outline: none;
} */



</style>
