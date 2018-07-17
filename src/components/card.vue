<template>
  
  
    
  
    <article class="people-small" style="height:300px;">
      <div class="people-wrap">
          <div class="people-image" style="float:left; width:20%; height:100vh; overflow:hidden ">
              <img src="../assets/170x170.gif" alt="" />           
          </div>
          <div class="people-content" style="float:left; width:80%; height:100vh; overflow:hidden; background:red;">
              <h3>{{ student.name.first }} {{ student.name.last }}</h3>
              <p class="title">{{ student.schoolStr }}</p>
              <p>Phone number: 123.456.7890<br />
              <a href="#">email@northwestern.edu</a></p>
          </div>
      </div>
      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel hendrerit massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut dapibus enim orci. Nullam auctor ex sit amet diam elementum sagittis. Aliquam sollicitudin eros vel leo volutpat condimentum. Aliquam pulvinar turpis a consectetur consequat. Aliquam sed dolor elementum, eleifend metus sit amet.</p>    


    </article>  

  

</template>

<script>
export default {
  name: 'card',
  props: ['student'],
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/css/print.css';
  @import '../assets/css/styles.css';
</style>
