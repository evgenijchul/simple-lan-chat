<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <small class="ml-2">{{text}}</small>
      
    </div>
    <div v-else class="wrap">
      <div class="card msg" :class="{owner}">
        <div class="card-header p-0 pl-1">{{name}}</div>
        <div class="card-content p-1">{{text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="css" scoped>

p {
  margin-bottom: 1rem;
}
.wrap {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}

.msg {
  _padding: 1rem;
  width: 60%;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
 
  position: relative;
  margin: 0;
 
}

.card-header {
   background-color: grey;
  color: black;
}
.owner {
  
  align-self: flex-end;
}
.owner .card-header {background-color: #1ba1e2;
  color: white;
}
</style>