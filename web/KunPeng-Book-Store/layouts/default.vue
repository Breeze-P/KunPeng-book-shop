<template>
  <v-app id="app">
    <main-header/>
    <nuxt />
    <main-footer/>
  </v-app>
</template>

<script>
import mainHeader from "~/components/Headers/mainHeader";
import mainFooter from "~/components/Footer/mainFooter";

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite';
// import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// export default defineConfig({
//   plugins: [
//     vue(),
//     AutoImport({
//       resolvers: [ArcoResolver()],
//     }),
//     Components({
//       resolvers: [
//         ArcoResolver({
//           sideEffect: true
//         })
//       ], 
//       mainHeader,
//       mainFooter
//     })
//   ]
// });
export default {

  components:{
    mainHeader,
    mainFooter
  }
}
</script>
