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
			<p class="forget-psd"><a href="#">忘记密码？</a></p>
		</el-form>
		<el-row class="copyright">Copyright 2017-2020 © 南京规贝软件科技有限公司版权所有 苏ICP备：16030832号 苏网文 [2015]2034-038号</el-row>
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
	        dialogFormVisible: false
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
