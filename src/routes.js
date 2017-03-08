import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import echarts from './pages/charts/echarts.vue'
import Preview from './pages/preview/preview.vue'
import BalanceRecharge from './pages/balancerecharge/BalanceRecharge.vue'
import RechargeRecord from './pages/rechargerecord/RechargeRecord.vue'
import RechargeStatus from './pages/balancerecharge/RechargeStatus.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        module_id:'0',
        hidden: true,
        children: []
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        module_id:'1',
        hidden: true,
        children: []
    },
    /*{
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
            { path: '/tab', component: Tab, name: '切换' },
            { path: '/tab2', component: Tab2, name: '切换2' },
        ]
    },
    */
    {
        path: '/',
        component: Home,
        name: '主导航-平台预览',
        module_id:'100010',
        iconCls: 'icon el-icon-ptyl',
        leaf: true,//只有一个节点
        children: [
            { path: '/preview', component: Preview, name: '平台预览'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '主导航-余额充值',
        module_id:'100002',
        iconCls: 'icon el-icon-yecz',
        leaf: true,//只有一个节点
        children: [
            { path: '/balancerecharge', component: BalanceRecharge, name: '余额充值',module_id:'100007' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '主导航-充值记录',
        module_id:'100001',
        iconCls: 'icon el-icon-czjl',
        leaf: true,//只有一个节点
        children: [
            { path: '/rechargerecord', component: RechargeRecord, name: '充值记录',module_id:'100005' }
        ]
    },
    {
        path: '*',
        hidden: true,
        moudule_id:'2',
        redirect: { path: '/404' },
        children: []
    }
];

export default routes;