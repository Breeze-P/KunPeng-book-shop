<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon size="18" v-bind="attrs" v-on="on" color="red">
        fa-regular fa-trash-xmark
      </v-icon>
    </template>
    <v-card>
      <v-card-title style="background-color:darkred;color:#fff">
        <h4 class="text-center">Are you sure you want to delete it !?</h4>
      </v-card-title>
      <v-card-text>
        <v-row style="margin: 20px 0px">
          <v-col cols="12">
            <p class="text-center">You are deleting the book {{ item.name }} by {{item.author1}}, are you sure to delete it !?</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="remove()"
          elevation="2"
          :loading="loading"
          rounded
          color="#8b0000"
          block
          dark
        >
          yes,I'm sure !
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  name: "removeProduct",
  data () {
    return {
      dialog: false,
      loading : false,
    }
  },
  methods:{
    ...mapActions('Products',['removeBooks']),
    ...mapMutations('Profile',['DELETE_CART']),

    remove(){
      this.loading = true
      // this.removeBooks(this.item.id)
      this.DELETE_CART(this.i)
      this.dialog = false
      this.$toast.show("删除成功", {
          type: "success",
          position: "bottom-right",
          duration : 2000
        });
    }
  },
  computed: {
    ...mapGetters('Profile',['GET_CART']),
  },
  props:{
    item:{default:''},
    i:{default:0}
  }
}
</script>
