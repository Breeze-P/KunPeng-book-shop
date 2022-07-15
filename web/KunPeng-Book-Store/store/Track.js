const BaseURL = 'http://172.23.23.40:8080/API/'
export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
    async VistTrack() {
        await this.$axios.post(`${BaseURL}visitTrack`, {})
    },
    async BrowseTrack(username, bookId) {
      const book = await this.$axios.post(`${BaseURL}browseTrack`, {"username": `${username}`, "id": `${bookId}`})
    },
    async CartTrack(username, bookId) {
        await this.$axios.post(`${BaseURL}cartTrack`, {"username": `${username}`, "id": `${bookId}`})
    },
    async BuyTrack(username, bookId) {
        await this.$axios.post(`${BaseURL}buyTrack`, {"username": `${username}`, "id": `${bookId}`})
    }
}
