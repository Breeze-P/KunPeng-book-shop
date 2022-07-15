<template>
  <v-row>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-row>
            <v-col  class="SubHeader" cols="12">
              <v-row>
                <v-col md="8" class="d-none d-md-flex" cols="12">
                  <h2>{{GET_CATEGORY_ACTIVE.name}}</h2>
                </v-col>
                <v-col md="8" class="d-flex d-md-none" cols="12">
                  <h2 style="width: 100%" class="text-center">{{GET_CATEGORY_ACTIVE.name}}</h2>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    color="#62ab00"
                    outlined
                    label="Search"
                    prepend-inner-icon="fa-regular fa-magnifying-glass"
                    v-model="SearchValue"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-row justify="center">
              <v-col v-for="(item,i) in Search" :key="i" sm="12" md="6" xl="4" cols="12">
                <product-card :item="item" />
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
  name: "id",
  data() {
    return {
        SearchValue:null,
    }
  },
  components: {
    productCard
  },
  methods: {
    ...mapActions('Products', ['GetBooks']),
    ...mapActions('Profile', ['SET_USER','SET_USER_LOGIN']),
    handleOrder() {
      this.$router.push(`/book/1`)
    },
  },
  computed:{
    ...mapGetters('Profile',['GET_LOGIN', 'GET_USER']),
    ...mapGetters('Products',['GET_CATEGORY', 'GET_CATEGORY_ACTIVE']),
    Search: {
      get: function () {
        if (this.SearchValue){
          return this.GET_CATEGORY.filter(item => (item.name) ? item.name.toLowerCase().includes(this.SearchValue.toLowerCase()) : '')
        }
        if (!this.SearchValue){
          return this.GET_CATEGORY
        }
      },
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
.SubHeader{
  color: #515151;
  margin: 20px 0;
}
</style>
