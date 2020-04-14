<template>
  <div>


<div class="card">
    <div class="card-header bg-gray">
        Card header
    </div>
    <div class="card-content p-2">
        Card with header and footer...
    </div>
    <div class="card-footer">
        Card Footer
    </div>
</div>


    <div v-if="name === 'admin'" class="system">
      <p class="text-xs-center">{{text}}</p>
      <hr />
    </div>
    <div v-else class="wrap">
      <div class="msg" :class="{owner}">
        <small>
          <strong>{{name}}</strong>
        </small>
        <p>{{text}}</p>
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
.system {
  margin-bottom: 1rem;
}
p {
  margin-bottom: 1rem;
}
.wrap {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 60%;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: blue;
  position: relative;
  margin-bottom: 1rem;
}

.owner {
  background-color: #fff;
  color: black;
  align-self: flex-end;
}
</style>