<template>
  <div id="app">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
    </el-row>
    <button @click="test" class="danger-color">测试</button> -->
    <!-- 根路由的出口 -->
    <router-view/>
  </div>
</template>

<script lang="ts">
// 推荐使用
import Vue from 'vue'
// import request from './utils/request'

// request({
//   method: 'GET',
//   url: '/boss/v2/api-docs?group=edu-boss-boot'
// }).then(res => {
//   console.log(res)
// })

interface Foo {
  a: string;
}
export default Vue.extend({
    data () {
        return {
            a: 1,
            b: 2,
        }
    },
    methods: {
        test () {
            this.b.valueOf()
        },
    },
})
</script>

<!----
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// 类的装饰器 其实就是扩展后面那个类的属性和功能
@Component
export default class App extends Vue {
  a = 1
  b= '2'
  c = {
    a: 1,
    b: '2'
  }

  test () {
    console.log(this.a)
  }
}
</script>
---->

<!----
<script>
export default {
  data () {
    return {
      a: 1,
      b: 2
    }
  },
  methods: {
    test () {
      this.b.as()
    }
  }
}
</script>
---->
<style lang="scss" scoped>
  // @import '~./styles/variables.scss';
  .danger-color{
    background-color: $danger-color
  }
</style>
