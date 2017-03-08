<template>
	<div class="pt44">
		<div class="yl-top">
			<h2><b>账户余额：</b>¥<span class="bd">{{amount}}</span><em v-bind:class="{'color-success':isSuccess, 'color-error':isError}">{{balanceStatus}}</em></h2>
			<h2 v-if="creditModel"><b>信用额度：</b>¥<span>{{credit}}</span></h2>
			<h2><router-link to="/balancerecharge" tag="button" class="el-button el-button--primary">余额充值</router-link></h2>
		</div>
		<div class="tbbox-yl">
			
			<div class="tbbox-01">
				<div class="tbbox-01-top clearfix">
					<h2 class="tb-tit">充值进度<em></em></h2>
					<el-tooltip placement="top" class="fr">
						<div slot="content">
							充值金额没有到账？<br/><br/>
							1.检查汇款订单中收款账户，收款卡号，备注渠道ID号是否正确（备注信息为您的渠道ID号，只填写数字ID即可）<br/>
							2.检查后台户名，卡号，开户行，金额是否对应汇款单<br/>
							3.到帐时间为一个工作日内<br/>
							4.如以上问题均无，请联系对接运营处理
						</div>
						<a href="javascript:void(0)" class="blue">充值金额没有到帐？</a>
					</el-tooltip>
				</div>
			  	<el-table :data="tableData1" :row-class-name="tableRowClassName" border style="width: 100%" height="281" @sort-change='sortChange'>
			    	<el-table-column prop="order_id" label="订单号" width="135" align="center"></el-table-column>
			    	<el-table-column prop="cardno" label="银行卡" width="142" align="center" show-overflow-tooltip></el-table-column>
			    	<el-table-column prop="amount" label="充值金额" width="123" align="right" :formatter="escape2" class-name="thcenter bold"></el-table-column>
			    	<el-table-column prop="status" label="进度" width="91" align="center" :formatter="escape" class-name = "status"></el-table-column>
			    	<el-table-column prop="create_time" label="创建时间" width="123" align="center" sortable="custom" show-overflow-tooltip></el-table-column>
			    	<el-table-column prop="verify_time" label="审核时间" width="123" align="center" sortable="custom" show-overflow-tooltip :formatter="escape1"></el-table-column>
			  	</el-table>
			  	<div class="tbbox-01-bot clearfix">
			  		<router-link to="/rechargerecord" class="c888 fr">查看完整交易记录<em>></em></router-link>
				</div>
			</div>
			
		</div>
    </div>
</template>
<script>
export default {
	data() {
	    return {
	    	amount:'',
	        isSuccess:false,
	        isError:false,
	        balanceStatus:'',
	        credit:'',
	        creditModel:false,
	        tableData1: [],
	        sortBycreatetime:'2',
	        sortByverfiytime:''
	    }
	},
	methods: {
		pxNum(a,b){
			return parseFloat(a.amount) > parseFloat(b.amount)
		},
		escape(row, column){
			var _status ='';
			if(row.status == 1){
				_status = "待审核"
			}else if(row.status == 2){
				_status = "审核通过"
			}else if(row.status == 3){
				_status = "驳回"
			}
			return _status;
		},
		escape1(row, column){
			if(row.verify_time == ""){
				row.verify_time = "-"
			}
			return row.verify_time;
			
		},
		escape2(row, column){
			var _amount = "￥" + row.amount;
			return _amount;
		},
		tableRowClassName(row, index) {
	        if (row.status == 1) {
	        	return 'color-loading';
	        }else if (row.status == 2) {
	        	return 'color-success';
	        }else if(row.status == 3){
				return 'color-error';
			}
	        return '';
	    },
	    changeData(){
	    	var _this = this;
	    	var userinfo = sessionStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
	    	_this.$http.post('http://192.168.188.148:9527/api/ptb/getrechargerecordlist', { userid: userinfo.userid,pageno:1,pagesize:6,sortbycreatetime:_this.sortBycreatetime,sortbyverfiytime:_this.sortByverfiytime}, {headers: {},emulateJSON: true}).then(
				function(response){
					_this.tableData1 = response.data.data.data;
					
				},function(response) {
				    // 这里是处理错误的回调
				    console.log(response)
				}
			);
	    },
	    sortChange(column){
	    	var _this = this,
	    		_prop = column.prop,
	    		_order = column.order;
	    	if(_order == "ascending"){
	    		_this.sortBycreatetime = 1;
	    		_this.sortByverfiytime = 1;
	    	}else{
	    		_this.sortBycreatetime = 2;
	    		_this.sortByverfiytime = 2;
	    	};
	    	if(_prop == "create_time"){
	    		_this.sortByverfiytime ="";
	    	}else if(_prop == "verify_time"){
	    		_this.sortBycreatetime ="";
	    	};
	    	_this.changeData();
	    }
	},
	mounted: function() {
		var _this = this;
		var userinfo = sessionStorage.getItem('userinfo');
		userinfo = JSON.parse(userinfo);
		// 账户信息
	    _this.$http.post('http://192.168.188.148:9527/api/user/getaccountinfo', { userid: userinfo.userid}, {headers: {},emulateJSON: true}).then(
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
					_this.balanceStatus = "余额较低，请及时充值";
				}else{
					_this.isError = true;
					_this.balanceStatus = "余额过低，已关闭支付";
				};
				
				if(lowest>=0){
					_this.creditModel = false;
				}else{
					_this.creditModel = true;
					_this.credit = -lowest;
				}
								
				
				
			},function(response) {
			    // 这里是处理错误的回调
			    console.log(response)
			}
		);
		
		_this.changeData()
	}
}
</script>