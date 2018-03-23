<template>
  <div class="panel-title">
    <span v-if="title" v-text="title"></span>
    <div class="panel-right">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      title: {
        type: String
      }
    }
  }
</script>
<style>
.panel-right {
  display: inline-block;
  margin-left: 300px;

}
</style>
