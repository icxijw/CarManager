<template>
  <div class="sidebar">
    <el-menu default-active="2" class="sidebar-el-menu" @open="handleOpen" :collapse="collapse" @close="handleClose"
      background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"  unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index" @click="gotoPage(threeItem.index)">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index" @click="gotoPage(subItem.index)">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index" @click="gotoPage(item.index)">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from './bus';
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-lx-home',
          index: '/', // 系统首页
          title: '系统首页'
        },
        {
          icon: 'el-icon-lx-cascades',
          index: '/carbrands', // 车辆品牌管理页面
          title: '车辆品牌管理'
        },
        {
          icon: 'el-icon-lx-copy',
          index: '/chargingstations', // 充电站管理页面
          title: '充电站管理'
        },
        {
          icon: 'el-icon-lx-copy',
          index: '/communityposts', // 社区管理页面
          title: '社区管理'
        },
        {
          icon: 'el-icon-lx-copy',
          index: '/faultcodes', // 故障码管理
          title: '故障码管理'
        },
        {
          icon: 'el-icon-lx-copy',
          index: '/users', // 用户管理
          title: '用户管理'
        },
        {
          icon: 'el-icon-lx-copy',
          index: '/vehicles', // 汽车管理
          title: '汽车管理'
        },
        // 其他菜单项...
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gotoPage(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 3.775rem;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar>ul {
  height: 100%;
}
</style>
