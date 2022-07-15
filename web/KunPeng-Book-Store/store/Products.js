// api示例
const ResourceURL = 'https://6102a09f79ed680017482214.mockapi.io/api/v1/Books'
const BaseURL = 'http://172.23.23.40:8080/API/'
const BaseBook = {
  bookid: 688,
  categoryId: 84,
  name: "这里会是一本书",
  score: 4.7,
  description: '在加载请稍候~',
  press: "北京交通大学出版社",
  author1: "赵少风",
  author2: null,
  isbn: "0062502182",
  isbn13: "978-0062502186",
  pageNum: 176,
  rating_num: 0,
  year: "1995",
  imageBig: "http://images.amazon.com/images/P/0062502182.01.LZZZZZZZ.jpg",
  imageMiddle: "http://images.amazon.com/images/P/0062502182.01.MZZZZZZZ.jpg",
  imageSmall: "http://images.amazon.com/images/P/0062502182.01.THUMBZZZ.jpg",
  price: 3.64
}
const Type = {
  Hot: 0,
  Personal: 1,
  Relative: 2
}
export const state = () => ({
  hot: [
    BaseBook,
    BaseBook,
    BaseBook
  ],
  personal: [
    BaseBook,
    BaseBook,
    BaseBook
  ],
  relative: [
    BaseBook,
    BaseBook,
    BaseBook
  ],
  currentProduct: BaseBook,
  category: [
    BaseBook,
    BaseBook,
    BaseBook
  ],
  categorys: [{
    cateId: 3,
    name: "Literature & Fiction",
    cateIds: [
        {
            cateId: 73,
            name: "Classics"
        }
    ]
}],
  currentCategory:
  {
    cateId: 73,
    name: "Classics"
  }
})

export const getters = {
  GET_PRODUCTS_H(state){
    return state.hot
  },
  GET_PRODUCTS_P(state) {
    return state.personal
  },
  GET_PRODUCTS_R(state){
    return state.relative
  },
  GET_BOOK(state){
    return state.currentProduct
  },
  GET_CATEGORYS(state) {
    return state.categorys
  },
  GET_CATEGORY(state) {
    return state.category
  },
  GET_CATEGORY_ACTIVE(state) {
    return state.currentCategory
  },
}

export const mutations = {
  SET_PRODUCTS_H(state, data){
    state.hot = data
  },
  SET_PRODUCTS_P(state, data){
    state.personal = data
  },
  SET_PRODUCTS_R(state, data){
    state.relative = data
  },
  SET_PRODUCT(state,data){
    state.currentProduct = data
  },
  SET_CATEGORY(state, data) {
    state.category = data
  },
  SET_CATEGORYS(state, data) {
    state.categorys = data
  },
  SET_CATEGORY_ACTIVE(state, data) {
    state.currentCategory = data
  },
  // SET_NEW_BOOK(state,data){
  //   state.products.push(data)
  // },
  // REMOVE_BOOK(state,data){
  //   state.products = state.products.filter(item => item.id !== data)
  // },
  // EDIT_BOOK(state,data){
  //   let index = state.products.findIndex(item => item.id === data.id)
  //   state.products[index].name = data.name
  //   state.products[index].Description = data.Description
  //   state.products[index].author = data.author
  //   state.products[index].image = data.image
  //   state.products[index].price = data.price
  //   state.products[index].publisher = data.publisher
  //   state.products[index].rate = data.rate
  //   state.products[index].year = data.year
  // },
}

export const actions = {
  async GetPersonalBooks({commit, state }, data) {
    // const bookb = await this.$axios.post(`${BaseURL}getBookListByCategories2`, {"cateId": `${76}`})
    // const books = await this.$axios.get(`${ResourceURL}`)
    // const books = await this.$axios.post(`${BaseURL}getBookRankList`, {"username": `${6238}`, "type": `${1}`, "bookid": `${bookid}`})
    const req = await this.$axios.post(`${BaseURL}getBookRankList`, data)
    console.log('personal list', req)
    if (1) {
      commit("SET_PRODUCTS_P", req.data.bookInfos);
      console.log(`更新${data.username}的个人推荐`)
    }
  },
  async GetCategory({commit, state}) {
    const res = await this.$axios.post(`${BaseURL}getBookListByCategories`, {})
    console.log('Get Category', res)
    commit("SET_CATEGORYS", res.data.parentIds)
  },
  async GetBook({commit, state }, data) {
    // const books = await this.$axios.get(`${ResourceURL}/${id}`)
    const books = await this.$axios.post(`${BaseURL}getBook`, data)
    console.log('getBook', books)
    commit("SET_PRODUCT", books.data.bookInfo);
    console.log('relative: ',  books.data.bookInfos)
    commit("SET_PRODUCTS_R", books.data.bookInfos)
  },
  async GetHotBooks({commit, state}, data) {
    const req = await this.$axios.post(`${BaseURL}gethotBook`, {})
    console.log('get hot list', req)
    commit("SET_PRODUCTS_H", req.data)
  },
  async GetByCate({commit, state}, data) {
    const books = await this.$axios.post(`${BaseURL}getBookListByCategories2`, data)
    console.log('category book list', books)
    commit("SET_CATEGORY", books.data)
  },
  async BrowseTrack({commit}, data) {
    const test = {
      "bookname": `and`
    }
    const books = await this.$axios.post(`${BaseURL}BrowseTrack`, test)
    console.log('search res', books)
  },
  // async AddBook({commit, state },data) {
  //   const books = await this.$axios.post(`${ResourceURL}`,data)
  //   if (books){
  //     commit("SET_NEW_BOOK", books.data);
  //     this.$toast.show("Book added successfully", {
  //       type: "success",
  //       position: "bottom-right",
  //       duration : 2000
  //     });
  //     return true
  //   }
  // },
  // async removeBooks({commit, state },data) {
  //   const books = await this.$axios.delete(`${ResourceURL}/${data}`)
  //   if (books){
  //     commit("REMOVE_BOOK", data);
  //     this.$toast.show("The book was successfully deleted", {
  //       type: "success",
  //       position: "bottom-right",
  //       duration : 2000
  //     });
  //     return true
  //   }
  // },
  // async editBook({commit, state },data) {
  //   const book = await this.$axios.put(`${ResourceURL}/${data.id}`,data)
  //   if (book){
  //     commit("EDIT_BOOK", data);
  //     this.$toast.show("The book was successfully Edited", {
  //       type: "success",
  //       position: "bottom-right",
  //       duration : 2000
  //     });
  //     return true
  //   }
  // },
}
