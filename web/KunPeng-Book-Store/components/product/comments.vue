<template>
  <div class="wrapper d-none d-sm-flex">
    <div class="book-card">
        <li class="comment-board">
            <div class="user-popover-box">
                <img src={{}} alt="头像"/>
            </div>
            <div className='content-box'>
                <div className="meta-box">
                    <span className="name">name</span>
                </div>
                <div className="content">
                    content
                </div>
                <div className="reply-state">
                        <span className="time">{new Date(parseInt(comment.comment_info.ctime) * 1000).toLocaleDateString()
                        }</span>
                    <div className="action-box">
                        <div className="like-action action">

                        </div>
                        <div className="comment-action action">

                        </div>
                    </div>
                </div>
            </div>  
        </li>
    </div>   
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: "commentCard",
  data() {
  },
  methods:{
    ...mapMutations('Products',['SET_PRODUCT']),
    GoToProduct(){
      this.SET_PRODUCT(null)
    //   this.$router.push(`/book/${this.item.bookid}`)
    }
  },
  computed:{
    ...mapGetters('Profile',['GET_LOGIN'])
  }
}
</script>

<style scoped>
.comment-list-box {
    padding: 0 1rem;
}

.comment-board {
    display: flex;
    margin: 1.5rem 0;
}
.user-popover-box img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
}

.sub-comment-list {
    padding: .5rem;
    background-color: #fafbfc;
    border-radius: 12px;
}

.sub-comment-box:last-child {
    margin-bottom: 0;
}

.sub-comment-box {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    align-items: flex-start;
}

span.position {
    max-width: 5.6rem;
}

.time {
    font-size: .8rem;
}

.content-box {
    margin-left: 1rem;
    width: 100%;
}

.content {
    margin-top: .45rem;
    font-size: .8rem;
    line-height: 1.28rem;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: #505050;
}
.reply-state {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .32rem;
    color: #8a93a0;
}

.reply-state .action-box, .reply-state .action-box .action {
    display: flex;
    align-items: center;
}

.reply-state .action-box {
    justify-content: space-between;
    min-width: 6rem;
}

</style>