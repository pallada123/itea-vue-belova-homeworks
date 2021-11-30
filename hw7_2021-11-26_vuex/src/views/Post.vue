<template>
  <div id="popup">

    <div id="popup-overlay" @click="goPrev"></div>
    <div id="popup-item">

      <div id="popup-content">

        <div v-if="!(isLoadedSinglePost && isLoadedUser)">Loading...</div>

        <div v-else>
          <p class="post-title">{{ SinglePost.title }}</p>
          <p>{{ SinglePost.body }}</p>

          <router-link :to="{name: 'User', params: { userId: User.id }}">{{ User.username }}</router-link>
        </div>

      </div>

      <button type="button" class="popup-close" @click="goPrev"></button>

    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import {GET_POSTS_SINGLE_POST, CLEAR_POSTS_SINGLE_POST} from "../types/actions";

export default {
  name: "Post",

  computed: {
    ...mapState('posts/', {
      SinglePost: state => state.SinglePost,
      isLoadedSinglePost: state => state.isLoadedSinglePost,
      User: state => state.User,
      isLoadedUser: state => state.isLoadedUser,
    })
  },

  /**
   * инициирует получение в стор одного поста
   */
  beforeCreate() {
    this.$store.dispatch(`posts/${GET_POSTS_SINGLE_POST}`, this.$route.params.postId);
  },

  methods: {

    /**
     * отсекает от пути текущего маршрута часть от последнего слэша до конца,
     * и перенаправляет пользователя по получившемуся пути.
     * чтобы при закрытии попапа с постом (крестиком или кликом на оверлей) мы возвращались на предыдущую страницу -
     * то есть пользователь просто закрывает попап и видит страницу, поверх которой попап отрисовывался.
     *
     * (так замороченно сделано для кейса:
     * "если открыть страницу-попап конкретного поста в новой вкладке".
     * сначала сделала просто router.go(-1), но если открыть в новой вкладке, предыдущей страницы в истории нет.
     * а как лучше перейти на родительский роут, я не придумала)
     *
     * после перенаправления отправляет в стор запрос на очистку объекта одного поста
     * (чтобы при открытии второго и далее попапа не видеть, как один текст заменяется на другой)
     */
    goPrev() {
      let index = this.$route.path.lastIndexOf('/');
      this.$router.push(this.$route.path.slice(0, index));
      this.$store.dispatch(`posts/${CLEAR_POSTS_SINGLE_POST}`);
    }

  }
}
</script>

<style scoped>
#popup-overlay {
  background-color: #000;
  opacity: .3;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
#popup-item {
  background-color: #fff;
  -webkit-box-shadow: 10px 17px 30px rgba(26,23,20,.35);
  box-shadow: 10px 17px 30px rgba(26,23,20,.35);
  width: 400px;
  min-height: 400px;
  max-width: 90vw;
  max-height: 90vh;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  border-radius: 20px;
}

button.popup-close {
  border: solid 1px #000;
  border-radius: 999px;
  color: #000;
  min-width: auto;
  text-align: center;
  height: 30px;
  width: 30px;
  line-height: normal;
  font-weight: bold;
  background: transparent url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGlkPSJjbG9zZSI+CiAgICAgICAgPHBhdGggaWQ9IngiIGQ9Ik0xOC43MTcgNi42OTdsLTEuNDE0LTEuNDE0LTUuMzAzIDUuMzAzLTUuMzAzLTUuMzAzLTEuNDE0IDEuNDE0IDUuMzAzIDUuMzAzLTUuMzAzIDUuMzAzIDEuNDE0IDEuNDE0IDUuMzAzLTUuMzAzIDUuMzAzIDUuMzAzIDEuNDE0LTEuNDE0LTUuMzAzLTUuMzAzeiIvPgogICAgPC9nPgo8L3N2Zz4K) center center no-repeat;
  -webkit-box-shadow: 0 0 0 rgba(0,0,0,0);
  box-shadow: 0 0 0 rgba(0,0,0,0);
  position: absolute;
  right: 10px;
  top: 10px;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  opacity: 1;
  margin: 0;
  cursor: pointer;
}
button.popup-close:hover {
  -webkit-transform: rotate(-180deg);
  -ms-transform: rotate(-180deg);
  transform: rotate(-180deg);
}

#popup-content {
  min-height: 400px;
  padding: 50px 20px 20px 20px;
  text-align: left;
}
.post-title {font-weight: bold;}



</style>