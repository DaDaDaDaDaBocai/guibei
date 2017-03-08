<template>
	<div class="pt190">
		<!-- 通用流程结果提示-成功 Start -->
		<div class="prompt-box">
			<div class="prompt-icon"><em class="el-icon-gou"></em></div>
			<h2>充值完成</h2>
			<h3>充值到帐时间会在工作日当天完成，非工作日充值时，将顺延到下个工作日优先处理</h3>
			<h5><router-link to="/balancerecharge" tag="button" class="el-button">返回</router-link>&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/rechargerecord" tag="button" class="el-button el-button--primary">查看进度</router-link></h5>
		</div>
		<!-- 通用流程结果提示-成功 End -->
	</div>
</template>
<script>
import jQuery from 'jquery'
export default {
	data() {
	    return {
	    	
	    }
	},
	methods:{
		
	},
	mounted() {
		jQuery(function(){
			jQuery("html,body").scrollTop(0);
		})
	}
}
</script>