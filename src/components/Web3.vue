<template>
  <div class="web3-indicator">
    <div v-if="state === 'CONNECTED'">
      <p>You're FULLY connected!</p>
    </div>
    <div v-else-if="state === 'READ_ONLY'">
      <p>You're connected, but in READ ONLY mode!</p>
    </div>
    <div v-else>
      <p>You're not connected :(!</p>
    </div>
  </div>
</template>

<script>
  import Web3 from 'web3'
  export default {
    name: 'web3',
    props: ['bgController'],
    mounted () {
      if (typeof window.web3 !== 'undefined') {
        // Hack to not have Vue observing all properties of the web3 API
        let newWeb3 = new Web3(window.web3.currentProvider)
        Object.freeze(newWeb3)
        this.web3 = newWeb3
        this.state = 'CONNECTED'
        this.$emit('new-state', 'CONNECTED')
        this.bgController.fullGridActive()
      } else {
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
        if (this.web3.isConnected()) {
          this.state = 'READ_ONLY'
          this.$emit('new-state', 'READ_ONLY')
          this.bgController.singleGridActive()
        }
      }
      this.bgController.animate()
    },
    data () {
      return {
        web3: null,
        state: 'DISCONNECTED'
      }
    },
    computed: {

    }
  }
</script>

<style lang="scss" type="text/scss">
.web3-indicator{
  position: absolute;
  bottom: 0;
  right: 0;
  padding: .5rem;
  border-top-left-radius: 5px;
  background: white;
}
</style>
