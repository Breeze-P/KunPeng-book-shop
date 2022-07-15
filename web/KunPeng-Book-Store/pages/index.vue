<template>
  <v-row>
    <!-- <v-col cols="12">
      <main-slider class="d-none d-md-flex"/>
    </v-col> -->
    <v-col cols="12">
      <v-container>
        <v-row>
          <!-- <v-col v-for="(item,i) in items" :key="i" md="6" cl="3" sm="6" cols="12">
            <card-item :text="item.text" :des="item.des" :icon="item.icon"/>
          </v-col>
          <v-col md="6" cols="12">
            <img alt="book" width="100%" src="~/assets/image/shop-book.jpg">
          </v-col>
          <v-col md="6" cols="12">
            <img alt="book" width="100%" src="~/assets/image/offer.jpg">
          </v-col> -->
          <v-row>
            <v-col  class="SubHeader" cols="12">
              <v-row>
                <v-col md="8" class="d-none d-md-flex" cols="12">
                  <h2>推荐书单</h2>
                </v-col>
                <v-col md="8" class="d-flex d-md-none" cols="12">
                  <h2 style="width: 100%" class="text-center">书单</h2>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    color="#62ab00"
                    outlined
                    label="Search"
                    prepend-inner-icon="fa-regular fa-magnifying-glass"
                    v-model="SearchValue"
                    @keyup.enter.native="handleSearch"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-row v-if="GET_LOGIN" justify="center">
              <v-col v-for="(item,i) in Search_P" :key="i" sm="12" md="6" xl="4" cols="12">
                <product-card :item="item" />
              </v-col>
            </v-row>
            <v-row v-else justify="center">
              <v-col v-for="(item,i) in Search" :key="i" sm="12" md="6" xl="4" cols="12">
                <product-card :item="item" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        <v-col cols="12">
          <v-img  src="https://ricest.ac.ir/wp-content/uploads/2018/02/Book-Banner.jpg"/>
        </v-col>
      </v-row>
    </v-col>
    <cart-model v-if="GET_LOGIN" />
  </v-row>
</template>

<script>
import mainSlider from "~/components/Slider/mainSlider";
import CardItem from "~/components/Items/CardItem";
import productCard from "~/components/product/productCard";
import addProduct from "~/components/product/addProduct";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import CartModel from "../components/product/cartModel.vue";
export default {
  components:{
    mainSlider,
    CardItem,
    productCard,
    addProduct,
    CartModel
},
  data () {
    return {
    items:[
      {
        text:"Free Shipping Item",
        icon:'fa-solid fa-truck',
        des:'Orders over $500'
      },
      {
        text:"Guarantee",
        icon:'fa-solid fa-arrow-rotate-left',
        des:'100% money back'
      },
      {
        text:"Cash On Delivery",
        icon:'fa-solid fa-money-bill-wave',
        des:'Lorem ipsum dolor'
      },
      {
        text:"Help & Support",
        icon:'fa-solid fa-life-ring',
        des:'Call us : + 10086'
      }
    ],
    SearchValue:null,
    }
  },
  methods:{
    ...mapActions('Products',['GetHotBooks', 'GetCategory', 'BrowseTrack']),
    ...mapMutations('Profile',['SET_USER_LOGIN']),
    handleSearch(e) {
      e.target.blur()
      this.SearchValue = ''
    }
  },
  // 推荐：个人向
  computed:{
    ...mapGetters('Products',['GET_PRODUCTS_P', 'GET_PRODUCTS_H', 'GET_CATEGORYS', 'GetByCate']),
    ...mapGetters('Profile',['GET_LOGIN']),
    Search_P: {
      get: function () {
        if (this.SearchValue){
          return this.GET_PRODUCTS_P.filter(item => (item.name) ? item.name.toLowerCase().includes(this.SearchValue.toLowerCase()) : '')
        }
        if (!this.SearchValue){
          return this.GET_PRODUCTS_P
        }
      },
    },
    Search: {
      get: function () {
        if (this.SearchValue){
          return this.GET_PRODUCTS_H.filter(item => (item.name) ? item.name.toLowerCase().includes(this.SearchValue.toLowerCase()) : '')
        }
        if (!this.SearchValue){
          return this.GET_PRODUCTS_H
        }
      },
    }
  },
  mounted(){
    this.GetHotBooks()
    if(this.$cookies.get('accessToken')){
      this.SET_USER_LOGIN(true)
    }
  }
}
</script>

<style scoped>
.SubHeader{
  color: #515151;
  margin: 20px 0;
}
</style>
