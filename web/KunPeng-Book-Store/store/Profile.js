// import { } from "./Products";

const BaseURL = 'http://172.23.23.40:8080/API/'
const BaseBook = {
  bookId: '0',
  name: '一本书',
  description: '这是一本书哦~',
  author1: '赵治宇',
  imageBig: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
  price: '12$',
  press: '北京交通大学出版社',
  score: 5,
  year: '2020/1/1'
}
const BaseOrder = {
  id: '0',
  payment: '100$',
  payment_type: '',
  post_fee: '',
  books: [
    BaseBook,
    BaseBook,
    BaseBook
  ]
}
export const state = () => ({
  LogIn:false,
  user:{
    userid: 6205,
    username: "6238",
    gender: 1,
    email: null,
    phone: null,
    zipCode: null,
    location: "beijing",
    detailAddress: null,
    country: "china",
    age: 18,
    identify: null,
    token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2MjM4IiwiaWF0IjoxNjU3NzAwMzg2LCJleHAiOjE2NTk3MDAzODZ9._O3iuZIMtoa8rx7WJgpy4HH2vgYtXdOZP8bpAbQMdeZGb2r7eWO3Ev2OKOtBRjEUEfE2bWlv5ON-jjPZhENpiA",
    order: [],
    cart: []
},
  cart:[],
  order:[],
  currentOrder: {
    orderid: 20,
    userid: 122,
    payNum: 11,
    payType: 1,
    createTime: "2022-07-14T10:58:13.000+00:00",
    orderTime: "2022-07-14T10:58:13.000+00:00",
    orderMount: 3,
    status: 1,
    orderDetails: [
        {
            orderDetailId: 14,
            orderid: 20,
            bookid: 123,
            mount: 1,
            bookInfo: {
                bookid: 123,
                categoryId: 84,
                name: "The Treasure of Montsegur: A Novel of the Cathars",
                score: 4.3,
                description: null,
                press: "HarperOne",
                author1: "Sophy Burnham",
                author2: null,
                isbn: "0060000791",
                isbn13: "978-0060000790",
                pageNum: 288,
                rating_num: 0,
                year: "2002",
                imageBig: "http://images.amazon.com/images/P/0060000791.01.LZZZZZZZ.jpg",
                imageMiddle: "http://images.amazon.com/images/P/0060000791.01.MZZZZZZZ.jpg",
                imageSmall: "http://images.amazon.com/images/P/0060000791.01.THUMBZZZ.jpg",
                price: 3.76
            },
            unitPrice: 4,
            totalPrice: 4
        }
    ]
},
})

export const getters = {
  GET_USER(state){
    return state.user
  },
  GET_LOGIN(state){
    return state.LogIn
    // state.LogIn
  },
  GET_CART(state) {
    return state.user.cart
  },
  GET_ORDER(state) {
    return state.order
  },
  GET_ORDER_NOW(state){
    return state.currentOrder
  }
}

export const mutations = {
  SET_USER(state,data){
    state.user = data
  },
  SET_USER_LOGIN(state,data){
    state.LogIn = data
  },
  SET_CART(state, data) {
    state.user.cart = data
  },
  DELETE_CART(state, index) {
    state.user.cart.splice(index, 1)
    state.cart.splice(index, 1)
  },
  DELETE_ORDER(state, index) {
    state.user.order.splice(index, 1)
    state.order.splice(index, 1)
  },
  SET_ORDER(state, data) {
    state.order = data
  },
  SET_ORDER_NOW(state, data) {
    state.currentOrder = data
  }
}

export const actions = {
  async GetUser({commit, state}, data) {
    const req = await this.$axios.post(`${BaseURL}login`, data)
    console.log("user data",req)
    // , username, password
    if (req.data.status === true){
      commit("SET_USER", req.data.user);
      commit("SET_ORDER", req.data.user.order)
      commit("SET_USER_LOGIN", true)
      this.$toast.show("登录成功", {
        type: "success",
        position: "bottom-right",
        duration : 2000
      });
      
      // fetch cart
      const cart = await this.$axios.post(`${BaseURL}QueryCartTrack`, {username: data.username});
      console.log("Query Cart",cart)
      if (cart){
        // req.data.status === true
        commit("SET_CART", cart.data);
      }

      return true
    } else {
      console.log('login fault')
      this.$toast.show("用户名或密码错误", {
        type: "error",
        position: "bottom-right",
        duration : 2000
      });
      return false
    }
  },
  // 用户注册
  async SignUpUser({}, data) {
    const req = await this.$axios.post(`${BaseURL}register`, data)
    console.log("sign up",req)
    if (req.data){
      this.$toast.show(`注册成功`, {
        type: "success",
        position: "bottom-right",
        duration : 2000
      });
      return true
    } else {
      console.log('sign up fault')
      this.$toast.show("注册失败", {
        type: "error",
        position: "bottom-right",
        duration : 2000
      });
      return false
    }
  },
  // 更新用户
  async UpdateUser({commit, state}) {
    const req = await this.$axios.post(`${BaseURL}UserUpdate2`, {
      ...state.user
    });
    console.log("Update user", req)
    if (req){
      // req.data.status === true
      // commit("SET_USER", user);
      return true
    } else {
      return false
    }
  },
  // 获取购物车
  async QueryCartTrack({commit, state}) {
    const req = await this.$axios.post(`${BaseURL}QueryCartTrack`, {username: state.user.username});
    console.log("Query Cart",req)
    if (req){
      // req.data.status === true
      commit("SET_CART", req.data);
      return true
    } else {
      return false
    }
  },
  // 增加购物车
  async AddCartTrack({commit, state},data) {
    const req = await this.$axios.post(`${BaseURL}AddCartTrack`, data)
    if (req.data) {
      // fetch cart
      const cart = await this.$axios.post(`${BaseURL}QueryCartTrack`, {username: data.username});
      console.log("Query Cart",cart)
      if (cart){
        // req.data.status === true
        commit("SET_CART", cart.data);
      }
    }
  },
  // 购买
  async buy({commit, state}) {
    const req = await this.$axios.post(`${BaseURL}BuyTrack`, {username: state.user.username})
    console.log('buy res', req)
    if (req.data) {
      // buy a turn
      const order = await this.$axios.post(`${BaseURL}QueryOrder`, {username: state.user.username});
      console.log("Query Order", order)
      if (order){
        commit("SET_ORDER", order.data);
      }
    }
  },
  // 删除订单
  async deleteorder({}, data) {
    const req = await this.$axios.post(`${BaseURL}DeleteOrder`, data)
    console.log('delete order res', req)
    if (req.data) {
      this.$toast.show("删除成功", {
        type: "success",
        position: "bottom-right",
        duration : 2000
      });
    }else {
      this.$toast.show("删除失败", {
        type: "error",
        position: "bottom-right",
        duration : 2000
      });
    }
  },
  // 获取订单详情
  async getOrder({commit, state}, data) {
    const req = await this.$axios.post(`${BaseURL}QueryOneOrder`, data);
    console.log("Query Order detail",req)
    if (req){
      // req.data.status === true
      commit("SET_ORDER_NOW", req.data);
      console.log(req.data)
      return true
    } else {
      return false
    }
  }
}
