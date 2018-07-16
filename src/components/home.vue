<template>
  <div id="home">
    <div id="leftSide">
      <div id="leftContent">
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

    <div id="rightSide">
      <div id="rightContent">
        <h2 style="text-align:left">Students</h2>
        <div id="myDropdown" ref="myDropdown" class="dropdown-content" >
          <div v-if="validStudents.length == 0" style="height:319px">- No students in these schools -</div>
          <div v-for="stu in validStudents" :key="stu.id">
            <v-card height="150px">
              <v-card-title><b>{{stu.name.first}} {{stu.name.last}}</b></v-card-title>
              <v-card-text>{{stu.schoolStr}}</v-card-text>
            </v-card>
          </div>
        </div> 
      </div>
    </div>

  </div>
</template>

<script>
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
    log: function (l) {
      console.log(l);
    },

    createData: function() {
      var t = [];
      var log = this.log;

      this.axios.get('https://randomuser.me/api/?results=50&inc=name,gender,nat&noinfo')
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
      if (this.checkedSchools.length > 0) {
        this.students.forEach(s => {
          var marker = 1;
          this.checkedSchools.forEach(sc => {
            if (!s.schools.includes(sc)) {marker = 0;}
          })
          if (marker == 1) {this.validStudents.push(s);}
        })
      }
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
      console.log(v);
      this.schoolsList.forEach(school => {
        var n = 0;
        v.forEach(student => {
          console.log(student.schools);
          console.log(school);
          if (student.schools.includes(school.code)) {
            n++;
          }
        })
        document.getElementById(school.code).innerHTML = "(" + n + ")";
      })
    },

    validStudentsInternal: function() {
      var v = [];
      console.log(this.students);
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
  margin: 0 auto;
}

#leftSide{
  width: 250px;
  background: LightGray;
  float: left;
  border: 1px solid;
  height: 400px;
}

#rightSide {
  margin-left: 250px;
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

#schoolList label {
  display: inline;
}

#home {
  position: relative;
  top: 50px;
}

</style>
