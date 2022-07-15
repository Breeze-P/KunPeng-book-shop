<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="add-book"
        color="success"
        fab
        v-bind="attrs"
        v-on="on"
        x-large
        dark
      >
      <div class="img-wrap">
        <svg t="1657459811684" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2284" width="200" height="200"><path d="M848 712H318.4c-25.6 0-46.4-19.2-48-41.6L240 201.6c-1.6-25.6-16-46.4-38.4-57.6l-48-20.8c-12.8-4.8-25.6 0-32 12.8s0 25.6 12.8 32l46.4 20.8c6.4 3.2 11.2 9.6 11.2 17.6l28.8 468.8c3.2 48 46.4 86.4 96 86.4H848c12.8 0 24-11.2 24-24s-11.2-25.6-24-25.6z" p-id="2285"></path><path d="M884.8 265.6c-14.4-16-35.2-25.6-57.6-25.6H337.6c-12.8 0-24 11.2-24 24s11.2 24 24 24h489.6c8 0 16 3.2 20.8 9.6 4.8 6.4 8 14.4 8 22.4l-38.4 211.2v1.6c-1.6 14.4-12.8 24-27.2 25.6l-420.8 32c-12.8 1.6-22.4 12.8-22.4 25.6 1.6 12.8 11.2 22.4 24 22.4h1.6l419.2-32c36.8-3.2 67.2-30.4 70.4-67.2l38.4-212.8v-1.6c4.8-20.8-1.6-43.2-16-59.2z" p-id="2286"></path><path d="M305.6 856m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" p-id="2287"></path><path d="M753.6 856m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z" p-id="2288"></path></svg>
      </div>
      </v-btn>
    </template>
    <v-card class="card-container">
      <v-card-title style="background-color:#62ab00;color:#fff">
        <h4 class="text-center">My Cart</h4>
      </v-card-title>
      <v-card-text>
        <div class="card-wrap" v-for="(item,i) in cartList" :key="i">
          <product-card :item="item" :flag="true" :i="i" />
        </div>
      </v-card-text>

      <v-divider></v-divider>
      <div class="empty-wrap" v-if="!GET_CART.length">
        <svg width="60" height="60" viewBox="0 0 48 48" fill="none"><path d="M24 5v6m7 1l4-4m-18 4l-4-4m27 33H8a2 2 0 01-2-2v-8.46a2 2 0 01.272-1.007l6.15-10.54A2 2 0 0114.148 18H33.85a2 2 0 011.728.992l6.149 10.541A2 2 0 0142 30.541V39a2 2 0 01-2 2z" stroke="#4E5969" stroke-width="2"/><path d="M41.5 30H28s-1 3-4 3-4-3-4-3H6.5" stroke="#4E5969" stroke-width="2"/></svg>
        <div>空空如也，快去选书！</div>
      </div>

      <v-card-actions class="footer">
        <v-btn
          v-if="GET_CART.length"
          @click="pay()"
          elevation="2"
          rounded
          color="#62ab00"
          block
          dark
        >
          Buy It!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
        dialog: false
    }
  },
  methods: {
    ...mapActions('Profile',['UpdateUser', "buy"]),
    ...mapMutations('Profile',['SET_USER']),
    pay() {
      const res = {...this.GET_USER, cart: []}
        this.SET_USER(res)

        this.buy()
        this.$toast.show("购买成功", {
          type: "success",
          position: "bottom-right",
          duration : 2000
        });
        this.dialog = false
    }
  },
  computed: {
    ...mapGetters('Products',[]),
    ...mapGetters('Profile',['GET_LOGIN', 'GET_USER', 'GET_CART']),
    cartList: {
      get: function () {
        if (this.GET_LOGIN) {
          // console.log('cart structure', this.GET_CART)
         return this.GET_CART
        }
      },
    }
  },
  onmount() {
    // console.log('cart start', this.GET_LOGIN)
  }
}
</script>

<style lang="scss" scoped>
.add-book {
  position: fixed;
  bottom: 20px;
  right: 20px;
  overflow: hidden;
}

.img-wrap {
    width: 40px;
    margin-left: -3px;
    z-index: 100;
    svg {
        width: 100%;
    }
}

.card-container {
    overflow-x: hidden;
    .card-wrap {
        margin-top: 30px;
    }
}

.empty-wrap {
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 20%;
    left: 50%;
    transform: translate(-50% );
}

</style>
