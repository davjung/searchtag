<template>
  <v-card>
    <article class="people-small">
      <div class="people-wrap" style="display:flex;">
        <div class="people-image">
            <img :src="student.image" alt="../assets/170x170.gif" />           
        </div>
        <div class="people-content" style="margin-left:15px;">
            <h3>{{ student.name }}</h3>
            <p class="title">{{ student.schoolStr }}</p>
            <p>Phone number: {{ student.phone }}<br />
            <a :href="`mailto:${student.mail}`" id="mailer">{{ student.mail }}</a></p>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel hendrerit massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut dapibus enim orci. Nullam auctor ex sit amet diam elementum sagittis. Aliquam sollicitudin eros vel leo volutpat condimentum. Aliquam pulvinar turpis a consectetur consequat. Aliquam sed dolor elementum, eleifend metus sit amet.</p>
    </article>  
  </v-card>
</template>

<script>
export default {
  name: 'card',
  props: {
    studentData: {
      type: Object,
      required: true
    },
 
    dataMap: {
      type: Object,
      required: false,
      default () {
        return {
          name: "name",               // first name, last name string ("David Jung")
          image: "image",             // image url string ("images.google.com/bugs.gif")
          mail: "mail",               // email string ("dav@gmail.com")
          phone: "phone",             // phone number string ("2242840288")
          title: "title",             // title string ("mr", "mrs")
          schoolStr: "schoolStr",     // string of schools ("Weinberg, McCormick")
        }
      }
    }
  },

  mounted() {
    
  },

  computed: {
    student() {
      let student = this.studentData;
     
      Object.entries(this.dataMap).forEach((entry) => {
        student[entry[0]] = this.studentData[entry[1]] || null
      });
      return student;
    },

    
  },

  // api agnostic - pass in new prop, 
  // computed functions (variables) 
  // variables declared programmatically

  data () {
    return {   
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/print.css';
  @import '../assets/css/styles.css';

  #mailer {
    text-decoration: none;
  }
</style>
