import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Preview from './pages/preview/preview.vue'
import BalanceRecharge from './pages/balancerecharge/BalanceRecharge.vue'
import RechargeRecord from './pages/rechargerecord/RechargeRecord.vue'

var _this = this;
var userinfo = sessionStorage.getItem('userinfo');
userinfo = JSON.parse(userinfo);
/*_this.$http.post('http://192.168.188.148:9527/api/user/getMenuTree', { userid: userinfo.userid}, {headers: {},emulateJSON: true}).then(
	function(response){
		console.log(response)
		
	},function(response) {
	    // 这里是处理错误的回调
	    console.log(response)
	}
);*/

let nav = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '主导航-平台预览',
        iconCls: 'icon el-icon-ptyl',
        leaf: true,//只有一个节点
        children: [
            { path: '/preview', component: Preview, name: '平台预览' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '主导航-余额充值',
        iconCls: 'icon el-icon-yecz',
        leaf: true,//只有一个节点
        children: [
            { path: '/balancerecharge', component: BalanceRecharge, name: '余额充值' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '主导航-充值记录',
        iconCls: 'icon el-icon-czjl',
        leaf: true,//只有一个节点
        children: [
            { path: '/rechargerecord', component: RechargeRecord, name: '充值记录' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];


export default nav;






