<template>
	<el-row class="main-wrap">
		<el-row class="panel">
			<el-col :span="24" class="panel-top clearfix">
				<el-col :span="8" class="logo">
					<em class="el-icon-logo"></em>
					<span>规贝开放平台</span>
				</el-col>
				<el-col :span="16" class="rightbar clearfix">
					<div @click="logout" class="login-out">退出</div>
					<el-row class="login-line">|</el-row>
					<el-dropdown trigger="hover">
						<span class="el-dropdown-link">{{sysUserName}}（ID：{{sysUserId}}）<i class="el-icon-caret-bottom el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="dialogFormVisible=true">修改密码</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
			<el-col :span="24" class="panel-center">
				<!--<el-col :span="4">-->
				<aside class="sideBar">
					<el-row class="side-balance">
						<h2>￥{{amount}}</h2>
						<p v-bind:class="{'color-success':isSuccess, 'color-error':isError}">{{balanceStatus}}</p>
					</el-row>
					<el-menu :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
						<template v-for="(item,index) in nav" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="!item.leaf">
								<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
								<el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="item.leaf&&item.children.length>0&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						</template>
					</el-menu>
				</aside>
				<!--</el-col>-->
				<!--<el-col :span="20" class="panel-c-c">-->
				<section class="panel-c-c">
					<div class="grid-content bg-purple-light clearfix">
						<el-col :span="24" class="column-tt">
							<h3 class="">{{$route.name}}</h3>
							<!--<el-breadcrumb separator="/" style="float:right;">
								<el-breadcrumb-item v-for="item in $route.matched">
									{{ item.name }}
								</el-breadcrumb-item>
							</el-breadcrumb>-->
						</el-col>
						<el-col :span="24" class="column-con">
							<!--<transition name="fade">-->
							<router-view></router-view>
							<!--</transition>-->
						</el-col>
					</div>
				</section>
				<!--</el-col>-->
			</el-col>
			<el-row class="panel-bottom">Copyright 2017-2020 © 南京规贝软件科技有限公司版权所有 <a href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action" target="_blank">苏ICP备：16030832号</a> <a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/d09fba96d1fe4d61bca66f43efb68e7d" target="_blank">苏网文 [2015]2034-038号</a></el-row>
			
			<el-dialog title="修改密码" custom-class="modify-password" v-model="dialogFormVisible">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
			    	<el-form-item label="原密码：" :label-width="formLabelWidth" prop="oldpwd">
			      		<el-input v-model="ruleForm.oldpwd" auto-complete="off" type="password" size="large" icon="by" placeholder="请输入原密码"  :on-icon-click="handleIconClick"></el-input>
			    	</el-form-item>
			    	<el-form-item label="新密码：" :label-width="formLabelWidth" prop="pass">
			      		<el-input v-model="ruleForm.pass" name="newpsd" auto-complete="off" type="password" size="large" icon="by" placeholder="请输入6~20位数字与字母组合"  :on-icon-click="handleIconClick"></el-input>
			    	</el-form-item>
			    	<el-form-item label="再来一次：" :label-width="formLabelWidth" prop="checkPass">
			      		<el-input v-model="ruleForm.checkPass" auto-complete="off" type="password" size="large" icon="by" placeholder="请输入6~20位数字与字母组合"  :on-icon-click="handleIconClick"></el-input>
			    	</el-form-item>
			  	</el-form>
			  	<div slot="footer" class="dialog-footer">
			    	<el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
			  	</div>
			</el-dialog>
		</el-row>
		<div class="contact-us" v-bind:class="{ h: isActive1, s: isActive2}" @click="kfShow"><el-button type="primary" icon="fk" size="large">有问题？联系我们</el-button></div>
		<el-row class="contact-us-qq" v-bind:class="{ s: isActive1, h: isActive2}">
			<div class="contact-us-top">
				<span>联系我们</span>
				<em class="el-icon-close close-contact-us-qq" @click="kfHide"></em>
			</div>
			<div class="contact-us-bot">
				<dl class="kf-item">
					<dt><span>宋达</span></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2355617593</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2355617593&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>songda@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>汪靖</span></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850662319</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850662319&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>wangjing01@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>沈孟</span></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850917857</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850917857&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>shenmeng@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>李丽珊</span></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850917840</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850917840&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>lilishan@17of.com</h4>
					</dd>
				</dl>
				<dl class="kf-item">
					<dt><span>赵晨</span></dt>
					<dd>
						<h3><em><img src="../assets/common/qq-icon.png" /></em><span>2850917932</span><a href="http://wpa.qq.com/msgrd?v=3&uin=2850917932&site=qq&menu=yes" target="_blank" class="blue">立即联系</a></h3>
						<h4><em><img src="../assets/common/email-icon.png" /></em>zhaochen@17of.com</h4>
					</dd>
				</dl>
			</div>
		</el-row>
	</el-row>
</template>
<script>
import jQuery from 'jquery'
import md5 from 'md5'
import routes from 'routes'
export default {
	data() {
		var checkOldpwd = (rule, value, callback) => {
			var _this = this;
			var userinfo = sessionStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
    		var ModpasswordParams = { userid: userinfo.userid, oldpwd:md5(_this.ruleForm.oldpwd),newpwd: md5(_this.ruleForm.pass)};
    		_this.$http.post('http://api.75177.com/api/user/modifypwd', ModpasswordParams, {headers: {},emulateJSON: true}).then(
				function(response){
		      		let { msg, code } = response.data;
		     		if (code != 0) {
		     			callback(new Error(msg));
		     		}else{
		     			_this.dialogFormVisible = false;
		     			_this.$confirm('', '友情提醒', {
		     				message1:'密码修改成功',
		     				message2:'',
	     					message:'请使用新密码重新登录',
				        	confirmButtonText: '去登录',
				        	customClass:'no-close',
				        	showCancelButton:false,
				        	closeOnClickModal:false,
				        	showclose:false
				        }).then(() => {
				        	_this.oldpwd = "";
				        	_this.pass = "";
				        	_this.checkPass = "";
				        	sessionStorage.removeItem('userinfo');
							_this.$router.push('/login');
				        }).catch(() => {
				          	    
				        });
		     		}
				},function(response) {
				    // 这里是处理错误的回调
				    console.log(response)
				}
			);
			
	    };
		var validatePass = (rule, value, callback) => {
	        if (value === '') {
	        	callback(new Error('请输入6~20位数字与字母组合'));
	        } else {
	        	if (this.ruleForm.checkPass !== '') {
	            	this.$refs.ruleForm.validateField('checkPass');
	        	}
	        	callback();
	        }
	    };
	    var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	        	callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm.pass) {
	        	callback(new Error('两次输入密码不一致!'));
	        } else {
	        	callback();
	        }
	    };
		return {
			sysUserName: '',
			sysUserId:'',
	        dialogFormVisible: false,
	        ruleForm: {
	        	oldpwd: '',
	        	pass: '',
	        	checkPass: ''
	        },
	        formLabelWidth: '120px',
	        rules: {
	        	oldpwd: [
	            	{ required: true, message: '请输入原密码', trigger: 'blur' },
	            	{ min: 6, max: 20, message: '请输入6~20位数字与字母组合', trigger: 'blur' },
	            	{validator: checkOldpwd, trigger: 'submit' }
	          	],
	          	pass: [
		            { required: true, validator: validatePass, trigger: 'blur' },
		            { pattern:/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$/, message: '请输入6~20位数字与字母组合', trigger: 'blur' }
		        ],
		        checkPass: [
		            { required: true, validator: validatePass2, trigger: 'blur' },
		        ]
	        },
	        nav:'',
	        amount:'',
	        isSuccess:false,
	        isError:false,
	        balanceStatus:'',
	        isActive1:false,
	        isActive2:false
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function (a, b) {
			
		},
		handleIconClick() {
			jQuery("body").on("click",".el-icon-by",function(){
				jQuery(this).addClass("el-icon-zy").removeClass("el-icon-by");
				jQuery(this).parent().find("input").attr("type","text");
			});
			jQuery("body").on("click",".el-icon-zy",function(){
				jQuery(this).addClass("el-icon-by").removeClass("el-icon-zy");
				jQuery(this).parent().find("input").attr("type","password");
			});
		},
		//退出登录
		logout: function () {
			var _this = this;
			this.$confirm('', '提示', {
				message:'确认退出吗?',
				message1:'',
				message2:'',
			}).then(() => {
				var _this = this;
				var userinfo = sessionStorage.getItem('userinfo');
				userinfo = JSON.parse(userinfo);
				_this.$http.post('http://api.75177.com/api/user/exit', {userid:userinfo.userid}, {headers: {},emulateJSON: true}).then(
					function(response){
						
					},function(response) {
					        // 这里是处理错误的回调
					    console.log(response)
					}
				);
				
				sessionStorage.removeItem('userinfo');
				_this.$router.push('/login');
			}).catch(() => {

			});
		},
		submitForm(formName) {
			var _this = this;
	        _this.$refs[formName].validate((valid) => {
	        	if (valid) {
	        		
	          	}else{
	            	return false;
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
	    }
	},
	mounted() {
		var _this = this;
		var userinfo = sessionStorage.getItem('userinfo');
		userinfo = JSON.parse(userinfo);
		if (userinfo) {
			_this.sysUserName = userinfo.channelname || '';
			_this.sysUserId = userinfo.userid || '';
		};
		_this.$http.post('http://api.75177.com/api/user/checkfirstpassword', {userid:userinfo.userid}, {headers: {},emulateJSON: true}).then(
			function(response){
	      		let { msg, code } = response.data;
	     		if (code == 0) {
	     			if(response.data.data.flag == 1){
	     				_this.$confirm('', '友情提醒', {
	     					message1:'',
	     					message2:'',
	     					message:'建议您修改初始密码',
				        	confirmButtonText: '去修改',
				        	cancelButtonText: '暂不修改',
				        	closeOnClickModal:false
				        }).then(() => {
				        	
				        	_this.dialogFormVisible = true
				        	
				        }).catch(() => {
     
				        });
				    }
	     		}
			},function(response) {
			        // 这里是处理错误的回调
			    console.log(response)
			}
		);
		
		
		//获取菜单
		
		_this.$http.post('http://api.75177.com/api/user/getMenuTree', { userid: userinfo.userid}, {headers: {},emulateJSON: true}).then(
			function(response){
				var newNav = [];
				var transfer = [];
				var transfer1 = [];
				var transfer2 = [];
				var transfer3 = [];
				var CloneRoutes = routes;
				var DataNav = response.data.data;
				
				for(var j = 0, len=DataNav.length; j < len; j++) {
   					if(DataNav[j].parent_id == 0){
   						transfer.push(DataNav[j]);
   					}else{
   						transfer1.push(DataNav[j]);
   					}
				};
				
				transfer.sort(function(a,b){
					return parseInt(a.sort) > parseInt(b.sort) ? 1 : parseInt(a.sort) == parseInt(b.sort) ? 0 : -1;
				});
				
				transfer1.sort(function(a,b){
					return parseInt(a.sort) > parseInt(b.sort) ? 1 : parseInt(a.sort) == parseInt(b.sort) ? 0 : -1;
				});
				
				CloneRoutes.forEach(function(value,index,array) {
					
					transfer.forEach(function(_value,index,array){
						if(value.module_id == _value.module_id){
							transfer2.push(value);
						}
					});
					
				});
				
				
				var dd = function(){
					
					transfer2.forEach(function(_value,_index,_array) {
						
						if(_value.leaf !== true && _value.hidden !== true ){
							
							_value.children.forEach(function(__value,__index,__array) {
								
								var flag = 1;
								
								
							   	transfer1.forEach(function(value,index,array) {
									
									if(value.module_id == __value.module_id){
										
										flag = 0;
										
									}
									
									
									if( index == array.length-1){
									
										if(flag == 1){
											
											transfer2[_index].children.splice(__index,1);
											dd();
										}
										
										
									}
									
									
								});
								   
								
							});
							
						}	
						
					});
					
				};
				
				dd();
				
			    _this.nav = transfer2;
				
			},function(response) {
			    // 这里是处理错误的回调
			    console.log(response)
			}
		);
		
		
		//获取用户信息
		
		_this.$http.post('http://api.75177.com/api/user/getaccountinfo', { userid: userinfo.userid}, {headers: {},emulateJSON: true}).then(
			function(response){
				
				let amount = parseFloat(response.data.data.amount),
					warn = parseFloat(response.data.data.warn), //余额警戒值
					lowest = parseFloat(response.data.data.lowest); //余额最低值
					
				_this.amount = amount;
				
				if(amount>=warn){
					_this.isSuccess = true;
					_this.balanceStatus = "账户正常";
				}else if(amount<warn && amount>=lowest){
					_this.isError = true;
					_this.balanceStatus = "余额较低";
				}else{
					_this.isError = true;
					_this.balanceStatus = "余额过低";
				}
								
			},function(response) {
			    // 这里是处理错误的回调
			    console.log(response)
			}
		);
		
	}
}
</script>