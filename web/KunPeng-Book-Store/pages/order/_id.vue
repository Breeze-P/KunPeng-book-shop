<template>
  <v-row>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-row>
            <v-col  class="SubHeader" cols="12">
              <v-row>
                <v-col md="8" class="d-none d-md-flex" cols="12">
                  <h2>订单详情</h2>
                </v-col>
              </v-row>
          <v-divider class="down"></v-divider>

            </v-col>
          </v-row>
          <div class="header">
            <div class="user-msg">
                <div class="username block">
                <span class="text">订单号</span>
                <div class="input">{{GET_ORDER_NOW.orderid}}</div>
                </div>
                <div class="email block">
                <span class="text">下单用户</span>
                <div class="input">{{GET_USER.username}}</div>
                </div>
                <div class="address block">
                <span class="text">下单时间</span>
                <div class="input">{{time}}</div>
                </div>
                <div class="email block">
                <span class="text">支付金额</span>
                <div class="input">{{GET_ORDER_NOW.payNum + '$'}}</div>
                </div>
            </div>
        </div>
          <v-col cols="12">
            <v-divider></v-divider>
            <h3 class="little-title">书目概览</h3>
            <v-row class="cards" justify="center">
              <v-col v-for="(item,i) in GET_ORDER_NOW.orderDetails" :key="i" sm="12" md="6" xl="4" cols="12">
                <product-card :item="item.bookInfo" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import productCard from "~/components/product/productCard";

export default {
  name: "order",
  data() {
    return {
    }
  },
  components: {
    productCard
  },
  methods: {
    // ...mapActions('Products', ['GetBooks']),
    ...mapActions('Profile', ['SET_USER','SET_USER_LOGIN']),
    dealdate(date) {
      const dt = new Date(date)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
  },
  computed:{
    ...mapGetters('Profile',['GET_LOGIN', 'GET_USER', 'GET_ORDER_NOW']),
    // ...mapGetters('Products',['GET_CATEGORY', 'GET_CATEGORY_ACTIVE']),
    time: {
        get() {
            return this.dealdate(this.GET_ORDER_NOW.orderTime)
        }
    }
  },
  mounted() {
  },
}
</script>

<style scoped lang="scss">
.SubHeader{
  color: #515151;
  margin: 20px 0;
}

.down {
    margin-top: 10px;
    margin-bottom: -10px;
}

.header {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    // padding: 10px;
    color: var(--gray-10);
    // background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
    //   no-repeat;
    background-size: cover;
    border-radius: 4px;
    .user-msg {
      width: 300px;
      margin-left: -100px;
      .block {
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;

        .input {
          width: 160px;
        } 
      }
    }
  }

.cards {
    margin-top: 20px;
}

.little-title {
    text-align: center;
    line-height: 40px;
    margin-top: 10px;
}

</style>
