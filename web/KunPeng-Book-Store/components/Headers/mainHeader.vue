<template>
  <v-container>
    <v-row>
      <v-col md="4" sm="3" cols="6">
        <img @click="()=> this.$router.push('/')" class="cursor-pointer" width="150vh" src="~/assets/image/logo.png"/>
      </v-col>
      <div class="title">
      </div>
      <v-col md="4" class="d-none d-sm-block d-md-block" sm="6" cols="6">
        <!-- <ul>
          <li>Categories</li>
          <li>About Us</li>
        </ul> -->
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-submenu index="1">
            <template slot="title">Category</template>
            <el-submenu v-for="(item, i) in GET_CATEGORYS" :key="i" :index="`1-${i}`">
              <template slot="title">{{item.name}}</template>
              <el-menu-item v-for="(cateItem, index) in item.cateIds" :index="`1-${i}-${index}`" @click="handleSubCateClick(cateItem)">{{cateItem.name}}</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">About Us</el-menu-item>
        </el-menu>
      </v-col>
      <v-col class="text-right login-container" md="4" sm="3" cols="6">
        <login-modal v-if="!GET_LOGIN"/>
        <v-menu
          v-if="GET_LOGIN"
          rounded="lg"
          offset-y
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
            class="width"
              dark
              rounded
              color="#62ab00"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                fa-solid fa-user
              </v-icon>
              Hi {{GET_USER.username}}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in menu"
              :key="item.text"
              link
              @click="handleMenuFunctions(item.id)"
            >
              <v-list-item-title  v-html="item.text">
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginModal from "~/components/Modals/LoginModal";
import {mapGetters, mapMutations, mapActions} from "vuex";
export default {
name: "mainHeader",
  data(){
      return{
        menu:[
          {
            id:1,
            text:'个人中心'
          },
          {
            id:2,
            text:'登出'
            // <i class="fa-regular fa-right-from-bracket"></i> 
          }
        ]
      }
  },
  methods:{
    ...mapMutations('Profile',['SET_USER_LOGIN']),
    ...mapMutations('Products', ['SET_CATEGORY_ACTIVE']),
    ...mapActions('Products',['GetCategory', 'GetByCate']),
    handleMenuFunctions(data){
      if (data == 2){
        this.$cookies.remove('accessToken')
        this.SET_USER_LOGIN(false)
        this.$toast.show("欢迎下次光临！", {
          type: "success",
          position: "bottom-right",
          duration : 2000
        });
        this.$router.push(`/`)
      } else {
        // 订单页面跳转
        this.$router.push(`/user/${this.GET_USER.username}`)
      }
    },
    handleSubCateClick(item) {
      this.SET_CATEGORY_ACTIVE(item)
      this.GetByCate({
        cateId: item.cateId
      })
      this.$router.push(`/category/${item.cateId}`)
    }
  },
  components:{
    LoginModal
  },
  computed:{
    ...mapGetters('Profile',['GET_LOGIN', 'GET_USER']),
    ...mapGetters('Products',['GET_CATEGORYS']),
  },
  mounted() {
    this.GetCategory()
  }
}
</script>

<style scoped>
/* .width {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
} */
ul{
  height:100%;
  display:flex;
  justify-content: space-between;
  align-items:center;
}
li{
  list-style-type: none;
  transition:.1s;
  cursor:pointer;
}
li:hover{
  color: #62ab00;
  border-bottom: 1px solid #62ab00;
}
.login-container{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cursor-pointer{
  margin: 0 auto;
  cursor: pointer;
}


</style>
