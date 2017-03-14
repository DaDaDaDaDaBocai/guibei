<template>
	<el-row class="login-box">
		<el-form :model="loginForm" :rules="rules2" ref="loginForm" :show-message="false" label-position="left" label-width="0px" class="login-form">
			<h2 class="main-logo"><em class="el-icon-logo"></em></h2>
			<h3 class="title">规贝开放平台</h3>
			<el-form-item prop="account">
				<el-input placeholder="用户名/账号" size="large" v-model="loginForm.account" @change="CheckRules" auto-complete="off">
					<el-row slot="prepend"><em class="el-icon-user"></em></el-row>
				</el-input>

			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input v-bind:type="psdType" placeholder="密码" size="large" v-bind:icon=" psdIcon ? 'zy' : 'by' " v-model="loginForm.checkPass" @change="CheckRules" auto-complete="off" :on-icon-click="handleIconClick">
					<el-row slot="prepend"><em class="el-icon-psd"></em></el-row>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" v-bind:disabled="disabled" @click.native.prevent="handleSubmit2" v-bind:class="{ error: isArror }" :loading="logining" class="login-button" >{{messageTxt}}</el-button>
			</el-form-item>
			<p class="forget-psd"><a href="javascript:void(0)" @click="forgetpassword">忘记密码？</a></p>
		</el-form>
		<el-row class="copyright">Copyright 2017-2020 © 南京规贝软件科技有限公司版权所有 <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">苏ICP备：16030832号</a> <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/d09fba96d1fe4d61bca66f43efb68e7d" target="_blank">苏网文 [2015]2034-038号</a></el-row>
		<div class="contact-us" v-bind:class="{ h: isActive1, s: isActive2}" @click="kfShow"><el-button type="primary" icon="fk" size="large">有问题？联系我们</el-button></div>
		<el-row class="contact-us-qq" v-bind:class="{ s: isActive1, h: isActive2}">
			<div class="contact-us-top">
				<span>联系我们</span>
				<em class="el-icon-close close-contact-us-qq" @click="kfHide"></em>
			</div>
			<div class="contact-us-bot">
				<dl class="kf-item">
					<dt><span>宋达</span><em>（华北地区）</em></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2355617593</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2355617593&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>songda@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>汪靖</span><em>（华东地区）</em></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850662319</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850662319&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>wangjing01@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>沈孟</span><em>（华南地区）</em></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850917857</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850917857&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>shenmeng@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>李丽珊</span><em>（华中地区）</em></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850917840</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850917840&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>lilishan@17of.com</h4>
					</dd>
				</dl>
			</div>
		</el-row>
	</el-row>
</template>
<script>
import NProgress from 'nprogress'
import md5 from 'md5'
export default {
    data() {
      	return {
	        logining: false,
	        loginForm: {
	        	account: '',
	        	checkPass: ''
	        },
	        psdType:"password",
	        psdIcon:false,
	        messageTxt:'登 录',
	        isArror: false,
	        disabled: true,
	        rules2: {
	        	account: [
	            	{ required: true, message: '请输入账号', trigger: 'change' }
	          	],
	          	checkPass: [
	            	{ required: true, message: '请输入密码', trigger: 'change' }
	          	]
	        },
	        dialogFormVisible: false,
	        isActive1:false,
	        isActive2:false
      	};
    },
    methods: {
      	handleSubmit2() {
        	var _this = this;
        	_this.$refs.loginForm.validate((valid) => {
          		if (valid) {
            		_this.logining = true;
            		NProgress.start();
            		var loginParams = { username: _this.loginForm.account, password: md5(_this.loginForm.checkPass)};
				    _this.$http.post('http://192.168.188.148:9527/api/user/login', loginParams, {
				        headers: {
				        },
				        emulateJSON: true
				    }).then(function(response) {
				      // 这里是处理正确的回调
				    	_this.logining = false;
              			NProgress.done();
             			let { msg, code } = response.data;
              
             			if (code != 0) {
             				
             				_this.messageTxt = msg;
             				_this.isArror = true;
                			
              			}else {
              				let channelname = response.data.data.channelname,
              				userid = response.data.data.userid;
              				let userstorage = {};
              				userstorage.channelname = channelname; 
              				userstorage.userid = userid;
              				userstorage.modifypassword = 0;
              				sessionStorage.setItem('userinfo',JSON.stringify(userstorage));
              				_this.$router.push({ path: '/preview' });
              			}
              
				    }, function(response) {
				        // 这里是处理错误的回调
				        console.log(response)
				    }); 
            
          		}else {
            		console.log('error submit!!');
            		return false;
          		}
        	});
      	},
		handleIconClick() {
			var _this = this;
			if(_this.psdIcon){
				_this.psdIcon = false;
				_this.psdType = "password";
			}else{
				_this.psdIcon = true;
				_this.psdType = "";
			}
		},
		CheckRules() {
			
			var _this = this;
        	_this.$refs.loginForm.validate((valid) => {
          		if (valid) {
          			_this.disabled = false;
          			_this.messageTxt = '登 录';
             		_this.isArror = false;
          		}else {
            		_this.disabled = true;
            		_this.messageTxt = '登 录';
             		_this.isArror = false;
          		}
        	});
		},
	    kfShow(){
	    	var _this = this;
	    	_this.isActive1= true;
	    	_this.isActive2= false;
	    },
	    kfHide(){
	    	var _this = this;
	    	_this.isActive1= false;
	    	_this.isActive2= true;
	    },
	    forgetpassword(){
	    	var _this = this;
	    	_this.$confirm('', '提示', {
				message1:'友情提醒',
				message2:'',
				message:'请点击右侧联系我们，询问客服',
	        	confirmButtonText: '关闭',
			    closeOnClickModal:false,
			    showCancelButton:false,
			}).then(() => {
			        	
			    _this.dialogFormVisible = true
			        	
			}).catch(() => {
 
			});
	    }
    },
    mounted() {
    	var _this = this;
    	document.onkeydown = function(e){
			if(!e){
		    	e = window.event;
		   	}
		   	if((e.keyCode || e.which) == 13){
		    	_this.handleSubmit2();
		   	}
		}
    }
}
</script>
