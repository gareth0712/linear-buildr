<template>
  <div id="mainPage">
    <div class="container">
      <landingPage v-if="!walletAddress"></landingPage>
      <appPage v-else></appPage>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import landingPage from "@/components/landingPage";
import appPage from "@/components/appPage";
import common from "@/config/common";

export default {
  components: {
    landingPage,
    appPage,
  },
  name: "mainPage",
  validate({ params, query, store, redirect }) {
    /***
     * 设置子页
     */
    if (params.sub) {
      if (common.SUBPAGE_OPTIONS[params.sub]) {
        store.commit("setCurrentAction", common.SUBPAGE_OPTIONS[params.sub]);
      } else if (common.WALLET_DETAILS_OPTIONS[params.sub]) {
        store.commit("setCurrentAction", 0);

        switch (params.sub) {
          case "transaction":
            store.commit("setWalletDetailsActionURL", "transaction");
            break;
          case "track":
            store.commit("setWalletDetailsActionURL", "track");
            break;
        }
      } else {
        return false;
      }
    } else {
      store.commit("setCurrentAction", 0);
    }
    return true;
  },
  data() {
    return {
      windowScreen: {
        //窗口
        width: 0,
        height: 0,
      },
      mobileWidth: 414, //移动端布局
      isMobile: window.innerWidth <= 414,
    };
  },
  watch: {
    walletAddress(data) {},
  },
  computed: {
    walletAddress() {
      return this.$store.state?.wallet?.address;
    },
  },
  methods: {
    //获取窗口数据
    getWindowScreen: _.throttle(function () {
      this.windowScreen = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      this.isMobile = this.windowScreen.width <= this.mobileWidth;
      this.$store.commit("setIsMobile", this.isMobile);
    }, 50),
  },
  mounted() {
    this.$store.commit("setIsMobile", this.isMobile);

    //监视窗口变化
    window.addEventListener("resize", this.getWindowScreen, false);
  },
  destroyed() {
    window.removeEventListener("resize", this.getWindowScreen, false);
  },
};
</script>

<style lang="scss" scoped>
#mainPage {
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  background: #fafafa;

  .container {
    margin: 0 auto;
    width: 1440px;
  }
}

@media only screen and (max-width: $max-phone-width) {
  #mainPage {
    overflow: visible;
    .container {
      width: 100vw;
    }
  }
}
</style>
