<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style lang="scss" type="text/scss">
  // Import a Google Font
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,700');

  // Update Bulma's global variables
  $family-sans-serif: "Nunito", sans-serif;


  // Import only what you need from Bulma
  @import "../node_modules/bulma/sass/utilities/_all.sass";
  @import "../node_modules/bulma/sass/base/_all.sass";
  @import "../node_modules/bulma/sass/elements/button.sass";
  @import "../node_modules/bulma/sass/elements/container.sass";
  @import "../node_modules/bulma/sass/elements/form.sass";
  @import "../node_modules/bulma/sass/elements/title.sass";
  @import "../node_modules/bulma/sass/components/navbar.sass";
  @import "../node_modules/bulma/sass/layout/hero.sass";
  @import "../node_modules/bulma/sass/layout/section.sass";
</style>
