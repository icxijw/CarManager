import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/BgCommon/Home.vue';
import Icon from '../components/Icon.vue';
import Carbrands from '../views/promotion/carbrands.vue';
import CarbrandsAddOrUpdate from '../views/promotion/carbrands-add-or-update.vue';
import ChargingStations from '../views/promotion/chargingstations.vue';
import ChargingStationsAddOrUpdate from '../views/promotion/chargingstations-add-or-update.vue';
import CommunityPosts from '../views/promotion/communityposts.vue';
import CommunityPostsAddOrUpdate from '../views/promotion/communityposts-add-or-update.vue';
import FaultCodes from '../views/promotion/faultcodes.vue';
import FaultCodesAddOrUpdate from '../views/promotion/faultcodes-add-or-update.vue';
import Users from '../views/promotion/users.vue';
import UsersAddOrUpdate from '../views/promotion/users-add-or-update.vue';
import UserVehicles from '../views/promotion/uservehicles.vue';
import UserVehiclesAddOrUpdate from '../views/promotion/uservehicles-add-or-update.vue';
import Vehicles from '../views/promotion/vehicles.vue';
import VehiclesAddOrUpdate from '../views/promotion/vehicles-add-or-update.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: '自述文件'
      },
      children: [
        {
          path: '/icon',
          component: Icon,
          meta: {
            title: '自定义图标'
          }
        },
        {
          path: '/carbrands',
          component: Carbrands,
          meta: {
            title: '汽车品牌'
          }
        },
        {
          path: '/carbrands/add-or-update',
          component: CarbrandsAddOrUpdate,
          meta: {
            title: '新增/修改汽车品牌'
          }
        },
        {
          path: '/chargingstations',
          component: ChargingStations,
          meta: {
            title: '充电站'
          }
        },
        {
          path: '/chargingstations/add-or-update',
          component: ChargingStationsAddOrUpdate,
          meta: {
            title: '新增/修改充电站'
          }
        },
        {
          path: '/communityposts',
          component: CommunityPosts,
          meta: {
            title: '社区帖子'
          }
        },
        {
          path: '/communityposts/add-or-update',
          component: CommunityPostsAddOrUpdate,
          meta: {
            title: '新增/修改社区帖子'
          }
        },
        {
          path: '/faultcodes',
          component: FaultCodes,
          meta: {
            title: '故障代码'
          }
        },
        {
          path: '/faultcodes/add-or-update',
          component: FaultCodesAddOrUpdate,
          meta: {
            title: '新增/修改故障代码'
          }
        },
        {
          path: '/users',
          component: Users,
          meta: {
            title: '用户列表'
          }
        },
        {
          path: '/users/add-or-update',
          component: UsersAddOrUpdate,
          meta: {
            title: '新增/修改用户'
          }
        },
        {
          path: '/uservehicles',
          component: UserVehicles,
          meta: {
            title: '用户车辆'
          }
        },
        {
          path: '/uservehicles/add-or-update',
          component: UserVehiclesAddOrUpdate,
          meta: {
            title: '新增/修改用户车辆'
          }
        },
        {
          path: '/vehicles',
          component: Vehicles,
          meta: {
            title: '车辆列表'
          }
        },
        {
          path: '/vehicles/add-or-update',
          component: VehiclesAddOrUpdate,
          meta: {
            title: '新增/修改车辆'
          }
        }
      ]
    }
  ]
});
