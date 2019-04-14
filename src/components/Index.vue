<template>
  <div id="index">
    <canvas v-show="shouldConnect" class="bg-canvas" ref="canvas"></canvas>
    <div @click="shouldConnect = true" class="hank" v-if="state !== 'CONNECTED'">
      <img src="../assets/hank.png">
    </div>
    <div class="david" v-else>
      <img src="../assets/head.gif">
    </div>

    <web3 v-on:new-state="state = $event" v-if="shouldConnect" :bg-controller="bg"></web3>

  </div>
</template>

<script>
  import Web3 from './Web3.vue'
  import VaporWaveBackground from '../js/vaporwave-background'
  export default {
    name: 'index',
    components: {Web3},
    mounted () {
      this.bg = new VaporWaveBackground(this.$refs.canvas)
    },
    data () {
      return {
        bg: null,
        shouldConnect: false,
        state: 'DISCONNECTED'
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss" type="text/scss">
  html{
    background: #0B1234
  }
  canvas.bg-canvas{
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .david{
    img{
      max-width: 25rem;
      max-height: 25rem;
    }
  }
  .hank{
    position: absolute;
    cursor: pointer;
    img{
      height: 25rem;
    }
  }
  .hank, .david{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dg .title{
    font-size: 1rem;
    margin: 0;
  }
</style>
