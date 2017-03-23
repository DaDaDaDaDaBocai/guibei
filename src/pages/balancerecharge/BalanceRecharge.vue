<template>
	<div class="pt44">
		<div class="recharge-top full-border">
			<h2 class="recharge-tit">第一步/转账或汇款：</h2>
			<div class="recharge-top-box clearfix">
				<div class="recharge-top-l">
					<dl>
						<dt><em class="el-icon-ka"></em></dt>
						<dd>
							<p>户名：江苏猎宝网络科技股份有限公司</p>
							<p>银行卡(卡号)：9558 8220 1000 5085 629</p>
							<p>开户行：工商银行玄武大道支行</p>
						</dd>
					</dl>
				</div>
				<div class="recharge-top-r">
					<dl>
						<dt><img src="../../assets/recharge/def-tx.png" alt="" /></dt>
						<dd>
							<h2>您的平台ID号：{{userids}}</h2>
							<p>ID号不填写或填写有误将会被退回</p>
						</dd>
					</dl>
					<div class="recharge-top-r-tips">
						<p>1.转账/汇款时，请在“备注”中填写您的ID号。</p>
						<p>2.渠道汇款会在工作日当天处理完成，非工作日时间</p>
						<p>将顺延到工作日优先处理。</p>
					</div>
				</div>
			</div>
		</div>
		<div class="recharge-bot">
			<h2 class="recharge-tit">第二步/填写付款信息：</h2>
			<el-form :model="rechargeForm" :rules="rules" ref="rechargeForm" label-position="left" label-width="260px" class="recharge-form">
			  	<el-form-item label="户名：" prop="owner">
			  		<el-input v-model="rechargeForm.owner" size="large" icon="close1" placeholder="请输入户名" @click="rechargeForm.owner =''" class="case-data"></el-input>
			  	</el-form-item>
			  	<el-form-item label="账号(卡号)：" prop="cardno">
			    	<el-input v-model="rechargeForm.cardno" size="large" icon="close1" placeholder="请输入账号（卡号）" @click="rechargeForm.cardno =''" class="case-data"></el-input>
			  	</el-form-item>
			  	<el-form-item label="开户行：" prop="bankname">
			    	<el-input v-model="rechargeForm.bankname" size="large" icon="close1" placeholder="请输入开户行" @click="rechargeForm.bankname =''" class="case-data"></el-input>
			  	</el-form-item>
			  	<el-form-item label="充值金额：" prop="amount">
			    	<el-input placeholder="请输入充值金额" v-model="rechargeForm.amount" size="large">
						<template slot="prepend">￥</template>
					</el-input>
					<em class="c333">元</em>
			  	</el-form-item>
			  	<el-form-item label="付款凭证：" prop="pzpic">
			    	<el-upload class="upload" drag action="http://api.75177.com/api/uploadimage" :on-success="handleSuccess" :on-error="handleError" :before-upload="handleBefore">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">
							<p>银行付款凭证，是在银行办理转账结算后，<br/>银行提供的书面凭证单。<br/>请点击右侧上传凭证照片。</p>
							<p>·PNG或者JPG或者gif格式<br/>·大小控制在2M以内</p>
						</div>
					</el-upload>
			  	</el-form-item>
			  	<el-form-item>
			    	<el-button type="primary" @click="onSubmit('rechargeForm')" :loading="logining"  class="rechargeForm-btn">提交申请</el-button>
			  	</el-form-item>
			</el-form>
		</div>
    </div>
</template>
<script>
import jQuery from 'jquery'
export default {
	data() {
		var validateMax = (rule, value, callback) => {
	        if (parseFloat(value) >= 10000000 ) {
	        	callback(new Error('请输入大于0并小于1千万的数'));
	        }else {
	        	callback();
	        }
	    };
	    var typeSize = (rule, value, callback) => {
	        if ( this.isTypeText !== '' ) {
	        	callback(new Error('上传图片只能是.png.jpg.gif格式!'));
	        }else if( this.isLt50MText !== '') {
	        	callback(new Error('上传图片大小不能超过 50MB!'));
	        }else{
	        	callback();
	        }
	    };
	    return {
	    	logining: false,
	        rechargeForm: {
	        	owner: '',
	        	cardno: '',
	        	bankname: '',
	        	amount: '',
	        	pzpic: ''
	        },
	    	rules: {
	        	owner: [
	            	{ required: true, message: '请输入户名', trigger: 'blur' },
	            	{ min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
	          	],
	          	cardno: [
	            	{ required: true, message:'请输入账号（卡号）', trigger: 'blur' },
	            	{ pattern:/^[1-9]\d{14,26}$/, message: '请输入15~27位银行卡号', trigger: 'blur' }
	          	],
	          	bankname: [
	            	{ required: true, message: '请输入户名', trigger: 'blur' },
	            	{ min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
	          	],
	          	amount: [
	          		{ required: true, message:'请输入充值金额', trigger: 'blur' },
	            	{ pattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入充值金额，支持小数点后2位', trigger: 'blur' },
	            	{ validator:validateMax, trigger: 'blur' }
	          	],
	          	pzpic: [
	          		{ validator:typeSize, trigger: 'blur' },
	          		{ required: true, message: '请上传付款凭证', trigger: 'submit' }
	          	]
	       },
	       userids:'',
	       isTypeText:'',
	       isLt50MText:''
	    }
	},
	methods:{
		onSubmit(formName){
			var _this = this;
			var userinfo = sessionStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
        	_this.$refs[formName].validate((valid) => {
	        	if (valid) {
	        		_this.logining = true;
	        		_this.$confirm('', '友情提醒', {
	     				message1:'',
	     				message2:'',
     					message:'是否确认充值？',
     					confirmButtonText: '确定',
						cancelButtonText: '取消',
			        	closeOnClickModal:false,
			        	showclose:false
			        }).then(() => {
			        	
			        	var submitParams = { userid:userinfo.userid,owner:_this.rechargeForm.owner,type:1,cardno:_this.rechargeForm.cardno,bankname:_this.rechargeForm.bankname,amount:_this.rechargeForm.amount,pzpic:_this.rechargeForm.pzpic};
		            	_this.$http.post('http://api.75177.com/api/ptb/addrechargerecord', submitParams, {headers: {},emulateJSON: true}).then(
							function(response){
								let { msg, code } = response.data;	
								if(code !== "0"){
									_this.$confirm('', '友情提醒', {
					     				message1:'',
					     				message2:'充值失败',
				     					message:msg,
							        	confirmButtonText: '关闭',
							        	showCancelButton:false,
							        	closeOnClickModal:false,
							        	showclose:false,
							        	callback: action => {
								            _this.logining = false;
								        }
							        }).then(() => {
							        	
							        }).catch(() => {
							          	    
							        });
								}else{
									_this.$router.push({ path: '/RechargeStatus' });
								}
					     		
							},function(response) {
							    // 这里是处理错误的回调
							    console.log(response)
							}
						);
			        	
			        }).catch(() => {
			          	_this.logining = false;
			        });
	        		
	          	}else {
	            	return false;
	          	}
	        });
    	},
    	handleSuccess: function (response) {
    		var _this = this;
    		var _pzpic = response.data.imgurl;
    		_this.isTypeText = '';
    		_this.isLt50MText = '';
    		_this.rechargeForm.pzpic = _pzpic;
    		_this.$refs.rechargeForm.validateField('pzpic');
      	},
      	handleError: function (response) {
      		console.log(response)
      	},
      	handleBefore:function(file){
      		var _this = this;
      		const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
	        const isLt50M = file.size / 1024 / 1024 < 50;
	        if (!isType) {
	        	_this.isTypeText = '上传图片只能是.png.jpg.gif格式!';
	        	_this.$refs.rechargeForm.validateField('pzpic');
	        	jQuery(".el-upload-list--text").find("li").eq(0).remove();
	        	_this.rechargeForm.pzpic = "";
	        	return false;
	        };
	        
	        if (!isLt50M) {
	        	_this.isLt50MText = '上传图片大小不能超过 50MB!';
	        	_this.isTypeText = '';
	        	_this.$refs.rechargeForm.validateField('pzpic');
	        	jQuery(".el-upload-list--text").find("li").eq(0).remove();
	        	_this.rechargeForm.pzpic = '';
	        	return false;
	        };
	        
	        
      		if(jQuery(".el-upload-list--text").find("li").length>0){
      			jQuery(".el-upload-list--text").find("li").eq(0).remove();
      		};
      	}
	},
	mounted() {
		var _this = this;
		var userinfo = sessionStorage.getItem('userinfo');
		userinfo = JSON.parse(userinfo);
		_this.userids = userinfo.userid;
		_this.$http.post('http://api.75177.com/api/ptb/getlastinfo', {userid:userinfo.userid}, {headers: {},emulateJSON: true}).then(
			function(response){
				let { msg, code } = response.data;	
				if(code !== "0"){
		      		let _owner = response.data.owner,
		      			_bankname = response.data.bankname,
		      			_cardno = response.data.cardno;
		      			
		      		_this.rechargeForm.owner = _owner;
		      		_this.rechargeForm.bankname = _bankname;
		      		_this.rechargeForm.cardno = _cardno;
		        }else{
		        	_this.$message.error(msg);
		        }
	      		
	     		
			},function(response) {
			        // 这里是处理错误的回调
			    console.log(response)
			}
		);
		// 情况输入内容
		setTimeout(function(){
			jQuery(function(){
				jQuery(".case-data").each(function(){
					if(jQuery(this).find("input").val()==""){
						jQuery(this).find("i").hide();
					}
				});
				jQuery(".case-data").find("i").click(function(){
					jQuery(this).hide();
				});
				jQuery(".case-data").on("input","input",function(){
					if(jQuery(this).val() == "" ){
						jQuery(this).parent().find("i").hide();
					}else{
						jQuery(this).parent().find("i").show();
					}
					
				});
				jQuery(".case-data").on("input","input",function(){
					if(jQuery(this).val() == "" ){
						jQuery(this).parent().find("i").hide();
					}else{
						jQuery(this).parent().find("i").show();
					}
					
				});
				if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){
					
					jQuery(".case-data").each(function(index){
						var myInput = document.getElementsByClassName("case-data")[index].childNodes[2], 
					    	lastValue = myInput.value;
						var onInput = function() {
						    if(lastValue !== myInput.value){
						    	lastValue = myInput.value;
						    	if(lastValue == ""){
						    		jQuery(".case-data").eq(index).find("i").hide();
								}else{
									jQuery(".case-data").eq(index).find("i").show();
								}
						    }
					  	};
					  	var onFocusChange = function(event) {
						    if(event.type === "focus") {
						    	document.addEventListener("selectionchange", onInput, false);
						    }else{
						    	document.removeEventListener("selectionchange", onInput, false);
						    }
				  	};
				  	myInput.addEventListener("input", onInput,false);
				  	myInput.addEventListener("focus", onFocusChange,false);
				  	myInput.addEventListener("blur", onFocusChange,false);
				});
			}
		});
		},1000);
	}
}
</script>