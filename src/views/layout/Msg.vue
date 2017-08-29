<template>
    <ul class="msg-list">
      <li>这是一条消息</li>
      <li>这是一条消息</li>
      <li>这是一条消息</li>
      <li>这是一条消息</li>
      <li>这是一条消息</li>
    </ul>
</template>

<script>
    export default {
      name: 'Msg',
      data() {
        return {
          msgs: []
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .msg-list{
      display: block;
      width: 90%;
      margin: 0 5%;
      padding: 0 5px;
      color: #bfcbd9;

      li{
        border: solid #bfcbd9;
        border-width: 0 0 1px 0;
        line-height: 40px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
</style>
