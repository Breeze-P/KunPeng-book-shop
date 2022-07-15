<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <template v-if="GET_LOGIN === false" v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          rounded
          v-bind="attrs"
          v-on="on"
          color="#62ab00"
        >
          <v-icon left>
            fa-solid fa-right-to-bracket
          </v-icon>
          LogIn
        </v-btn>
      </template>
      <v-card>
        <v-card-title style="background-color:#62ab00;color:#fff">
          <h4 v-if="isLogin" class="text-center">LogIn</h4>
          <h4 v-else class="text-center">SighUp</h4>
        </v-card-title>
        <v-card-text>
          <v-row style="margin: 20px 0px">
            <v-col cols="12">
              <v-text-field
                label="用户名"
                placeholder="输入你的用户名"
                outlined
                v-model="username"
              ></v-text-field>
              <v-text-field
                type="password"
                label="密码"
                placeholder="输入密码"
                outlined
                v-model="password"
              ></v-text-field>
              <h4 v-if="isLogin" @click="changeState" class="text-center forgot">注册</h4>
              <h4 v-else @click="changeState" class="text-center forgot">登录</h4>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            @click="SubmitLogin()"
            v-if="isLogin"
            elevation="2"
            rounded
            color="#62ab00"
            block
            dark
          >
            登录
          </v-btn>
          <v-btn
            @click="SubmitSignUp()"
            v-else
            elevation="2"
            rounded
            color="#62ab00"
            block
            dark
          >
            注册
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { thisExpression } from '@babel/types';
import { get } from 'http';
import { timeout } from 'q';
import {mapGetters,mapMutations,mapActions} from 'vuex'
const BaseURL = 'http://172.23.23.40:8080/API/'
export default {
  name: "LoginModal",
  data () {
    return {
      dialog: false,
      username:null,
      password:null,
      isLogin: true,
    }
  },
  computed:{
    ...mapGetters('Profile',['GET_USER','GET_LOGIN']),
  },
  methods:{
    ...mapMutations('Profile',['SET_USER_LOGIN', 'SET_USER']),
    ...mapActions('Profile',['GetUser', 'SignUpUser']),
    ...mapActions('Products',['GetPersonalBooks']),
    changeState(){
      this.isLogin = !this.isLogin
    },
    SubmitLogin(){
      this.GetUser({
        username: this.username,
        password: this.password
      })
      this.dialog = false
      // this.$cookies.set('accessToken','Bearer')
      this.GetPersonalBooks({
        type: 1,
        username: this.username
      })

      // if (this.$route.path === '/') {
      //     location.reload()
      // } else {
      //   this.$router.push('/')
      // }
    },
    SubmitSignUp() {
      this.SignUpUser({
        username: this.username,
        password: this.password
      })
      this.dialog = false
      this.changeState()
    }
  }
}
</script>

<style scoped>
.forgot{
  cursor:pointer;
  margin:0 auto;
  transition:.2s;
}
.forgot:hover{
  color: #62ab00;
}

</style>
