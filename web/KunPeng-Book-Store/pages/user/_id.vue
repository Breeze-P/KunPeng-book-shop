<template>
 <!-- v-if="GET_LOGIN" -->
  <div v-if="GET_LOGIN">
    <div class="container">
      <div class="header">
        <div class="avatar-wrap">
          <img src="" />
        </div>
        <div class="user-msg">
            <div class="username block">
              <span class="text">用户名</span>
              <div class="input">{{user.username}}</div>
            </div>
            <div class="email block">
              <span class="text">电子邮箱</span>
              <el-input class="input" @keyup.enter.native="handleUserUp"  v-model="user.email" placeholder="email"></el-input>
            </div>
            <div class="address block">
              <span class="text">邮件地址</span>
              <el-input class="input" @keyup.enter.native="handleUserUp"  v-model="user.location" placeholder="address"></el-input>
            </div>
            <div class="email block">
              <span class="text">年龄</span>
              <el-input class="input" @keyup.enter.native="handleUserUp"  v-model="user.age" placeholder="age"></el-input>
            </div>
            <div class="email block">
              <span class="text">国家</span>
              <el-input class="input" @keyup.enter.native="handleUserUp"  v-model="user.country" placeholder="country"></el-input>
            </div>
        </div>
      </div>
      <el-divider content-position="center">我的订单</el-divider>
      <div class="table-wrap">
        <el-table
        class="table"
        :data="tableData"
        style="width: 70%">
        <el-table-column
          prop="id"
          label="订单号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="books"
          label="书名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="time"
          label="下单时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="pay"
          label="费用"
          width="80">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleOrder(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="deleteOrder(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import productCard from "~/components/product/productCard";

export default {
  name: "id",
  data() {
    return {
      randomKey:[],
    }
  },
  components: {
    productCard
  },
  methods: {
    ...mapActions('Profile', ['UpdateUser', 'deleteorder', 'getOrder']),
    ...mapMutations('Profile',['DELETE_ORDER']),
    suggestionItem() {
      for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * 9) + 1;
      let result = this.randomKey.find(item => item === index)
        if (!result){
          this.randomKey.push(index)
        }
      else{
          this.randomKey.push(index - 1)
        }
      }

    },
    handleOrder(item) {
      this.getOrder({orderid: item.id})
      this.$router.push(`/order/${item.id}`)
    },
    handleUserUp(e) {
      e.target.blur()
      let key = window.event.keyCode;
      if (key === 13) {
      this.$toast.show("更新成功", {
        type: "success",
        position: "bottom-right",
        duration : 2000
      });
      }
      this.UpdateUser({user: this.GET_USER})
    },
    dealdate(time) {
      console.log(time)
      var date = new Date(time).toUTCString();
      return date;
    },
    deleteOrder(item) {
      this.deleteorder({orderid: item.id})
      this.DELETE_ORDER(item.index)
    }
  },
  computed:{
    ...mapGetters('Profile',['GET_LOGIN', 'GET_USER', 'GET_ORDER']),
    // user: {
    //   get: () => this.userValue,
    //   set: val => this.SET_USER(val),
    // },
    // ...mapGetters({
    //      value: 'Profile/GET_USER',
    //     }),
    user: {
      get() {
        return this.$store.state.Profile.user
      },
      set(val) {
        this.$store.commit('Profile/SET_USER', val)
      }
    },

    // 订单看板数据
    tableData: {
      get() {
        const order = this.GET_ORDER
        const res = []
        order.map((item, i) => {
          let books = []
          item.orderDetails.map((it) => {
            books.push(it.bookInfo.name)
          })
          res.push({
              id: item.orderid,
              books: books.join(','),
              pay: item.payNum + '$',
              time: this.dealdate(item.orderTime),
              index: i
            })
        })
        return res
      }
    },
  },
  mounted() {
    this.suggestionItem()
    if (!this.GET_LOGIN) {
      this.$router.push('/')
    }
  },
}
</script>

<style  scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Pontano+Sans");

.container {
  margin: auto;
  padding: 20px;
  max-width: 71.25rem;
  width: 100%;
  // height: 100vh;
}

.header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 30px;
    color: var(--gray-10);
    background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
      no-repeat;
    background-size: cover;
    border-radius: 4px;
    .user-msg {
      width: 300px;
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

  .table-wrap {
    // margin-top: 20px;
    // position: relative;
    display: grid;
    .table {
      // position: absolute;
      // top: 20%;
      // left: 50%;
      // transform: translate(-50%, 0);
      align-self: center;
      justify-self: center;
    }
  }

</style>
