<template>
	<div class="rec-record-box">
		<div class="screen-box full-border">
			<el-form :inline="true" :model="screenForm" class="demo-form-inline">
				<el-form-item label="创建时间：">
			    	<el-date-picker v-model="screenForm.timer" type="datetimerange" :picker-options="pickerOptions2" placeholder="请选择时间范围" align="left">
			    	</el-date-picker>
			  	</el-form-item>
			  	<el-form-item label="状态：">
			    	<el-select v-model="screenForm.status" placeholder="请选择状态">
			    		<el-option label="全部" value=" "></el-option>
			      		<el-option label="审核通过" value="2"></el-option>
			     	 	<el-option label="待审核" value="1"></el-option>
			     	 	<el-option label="驳回" value="3"></el-option>
			    	</el-select>
			  	</el-form-item>
			  	
			  	<el-form-item>
			    	<el-button type="primary" @click="onSubmit">搜索</el-button>
			    	<el-button @click="onExport">导出</el-button>
			 	</el-form-item>
			</el-form>
	    </div>
	    <div class="rec-record-con">
	    	<div class="rec-record-tit clearfix">
	    		<!--<div class="rec-record-tit-l fl"><em>合计入账金额：¥</em> <span>3000000.00</span></div>-->
	    		<div class="rec-record-tit-r fr">
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
	    	</div>
	    	<div class="table-box">
	    		<el-table :data="recordTable" :row-class-name="tableRowClassName" border style="width: 100%" @sort-change='sortChange'>
			    	<el-table-column prop="order_id" label="订单号" min-width="130" align="center"></el-table-column>
			    	<el-table-column prop="cardno" label="帐号(卡号)" min-width="140" align="center" show-overflow-tooltip></el-table-column>
			    	<el-table-column prop="amount" label="充值金额" min-width="110" align="right" :formatter="escape2" class-name="thcenter bold"></el-table-column>
			    	<el-table-column prop="status" label="进度" min-width="120" align="center" :formatter="escape" class-name = "status"></el-table-column>
			    	<el-table-column prop="create_time" label="创建时间" min-width="144" align="center" sortable="custom" show-overflow-tooltip></el-table-column>
			    	<el-table-column prop="verify_time" label="审核时间" min-width="144" align="center" sortable="custom" show-overflow-tooltip :formatter="escape1"></el-table-column>
			    	<el-table-column prop="remark" label="备注" min-width="112" align="center" show-overflow-tooltip></el-table-column>
			      	<el-table-column label="操作" align="center">
				    	<template scope="scope">
				        	<a href="javascript:void(0)" @click="viewDetails(scope.$index)" class="c666">详情</a>
				    	</template>
				    </el-table-column>
			  	</el-table>
			  	<div class="pagination-box">
				  	<el-pagination
				    	@size-change="handleSizeChange"
				    	@current-change="handleCurrentChange"
				    	:page-sizes="[10, 20, 30, 40]"
				    	:page-size="Number(SizePage)"
				    	:current-page = "Number(currentPage)"
				    	layout="total, sizes, prev, pager, next, jumper"
				    	:total="Number(Total)">
				    </el-pagination>
			    </div>
	    	</div>
	    </div>
	    
	    <el-dialog title="充值记录详情" v-model="dialogFormVisible" custom-class="dia-recharge-details">
	    	<div class="recdet-con clearfix">
	    		<div class="recdet-con-l">
		    		<el-form :model="recdetForm" label-position="left">
				    	<el-form-item label="户名：" :label-width="formLabelWidth">
				    		<el-input v-model="recdetForm.owner" auto-complete="off" :disabled="true"></el-input>
				    	</el-form-item>
				    	<el-form-item label="帐号(卡号)：" :label-width="formLabelWidth">
				    		<el-input v-model="recdetForm.cardno" auto-complete="off" :disabled="true"></el-input>
				    	</el-form-item>
				    	<el-form-item label="开户行：" :label-width="formLabelWidth">
				    		<el-input v-model="recdetForm.bankname" auto-complete="off" :disabled="true"></el-input>
				    	</el-form-item>
				    	<el-form-item label="金额：" :label-width="formLabelWidth">
				    		<el-input v-model="recdetForm.amount" auto-complete="off" :disabled="true"></el-input>
				    	</el-form-item>
				    	<el-form-item label="付款凭证：" :label-width="formLabelWidth">
				    		<img v-bind:src="recdetForm.pzpic" style="max-width: 460px;" alt="" />
				    	</el-form-item>
				  	</el-form>
			  	</div>
			  	<div class="recdet-con-r">
			  		<h2>进度：<span v-if="recdetForm.status=='1'" class="color-success">待审核</span><span v-else-if="recdetForm.status=='2'" class="color-success">审核通过</span><span v-else-if="recdetForm.status=='3'" class="color-error">驳回</span></h2>
			  		<el-steps :space="100" direction="vertical" v-bind:active="Number(analysisStatsstep)">
						<el-step title="提交充值申请" v-bind:description="recdetForm.create_time"></el-step>
						<el-step v-bind:title="analysisStatstext" v-bind:description="recdetForm.verify_time"></el-step>
					</el-steps>
			  	</div>
	    	</div>
		</el-dialog>
	    
    </div>
</template>
<script>
export default {
	data() {
	    return {
	    	screenForm: {
	        	timer: '',
	        	status: ''
	       	},
	       	recdetForm:{
	       		owner: '',
	        	cardno: '',
	        	bankname:'',
	        	amount:'',
	        	pzpic:'',
	        	status:'',
	        	create_time:'',
	        	verify_time:''
	       	},
	       	recordTable:[],
	       	ok:true,
	       	pickerOptions2: {
	        	shortcuts: [{
	            	text: '最近一周',
	            	onClick(picker) {
	              		const end = new Date();
	              		const start = new Date();
	              		start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              		picker.$emit('pick', [start, end]);
	            	}
	        	}, {
	            	text: '最近一个月',
	            	onClick(picker) {
	              		const end = new Date();
	              		const start = new Date();
	              		start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              		picker.$emit('pick', [start, end]);
	            	}
	          	}, {
	            	text: '最近三个月',
	            	onClick(picker) {
	              		const end = new Date();
	              		const start = new Date();
	              		start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
	              		picker.$emit('pick', [start, end]);
	            		}
	          	}]
	        },
	        currentPage:'1',
	        SizePage: '10',
	        Total:'',
	        StartTime:'',
	        EndTime:'',
	        sortBycreatetime:'2',
	        sortByverfiytime:'',
	        Status:'',
	        dialogFormVisible: false,
	        formLabelWidth: '135px',
	        analysisStatsstep:'',
	        analysisStatstext:'',
	    }
	},
	props:['intoPage'],
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
	    	_this.currentPage = 1;
	    	_this.changePage()
	    },
	    onSubmit() {
	    	var _this = this;
	    	var _timeline = _this.screenForm.timer;
	    	if(!_timeline[0] || _timeline == " "){
	    		_this.StartTime = '';
	    		_this.EndTime = '';
	    	}else{
	    		_this.StartTime = _timeline[0].Format("yyyy-MM-dd HH:mm:ss");
	    		_this.EndTime = _timeline[1].Format("yyyy-MM-dd HH:mm:ss");
	    	};
	    	_this.Status = _this.screenForm.status;
	    	_this.Status == ' ' ? _this.Status='':_this.Status;
	    	_this.currentPage = 1;
	    	_this.changePage();
    	},
    	onExport(){
    		var _this = this;
			var userinfo = sessionStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			var _this = this;
	    	var _timeline = _this.screenForm.timer;
	    	try{
	    		_this.StartTime = _timeline[0].Format("yyyy-MM-dd HH:mm:ss");
	    		_this.EndTime = _timeline[1].Format("yyyy-MM-dd HH:mm:ss");
	    	}catch(e){
	    		//TODO handle the exception
	    	};
	    	if(_this.screenForm.status == " "){
	    		_this.screenForm.status ="";
	    	};
	    	_this.Status = _this.screenForm.status;
			var onExportParams = { userid: userinfo.userid,startTime:_this.StartTime,endTime:_this.EndTime,status:_this.Status,category:1};
			window.location.href= 'http://api.75177.com/api/ptb/exportrecordlist?userid='+onExportParams.userid+'&startTime='+onExportParams.startTime+'&endTime='+onExportParams.endTime+'&status='+onExportParams.status+'&category='+onExportParams.category;
    	},
    	changePage(){
    		var _this = this;
			var userinfo = sessionStorage.getItem('userinfo');
			userinfo = JSON.parse(userinfo);
			var recordTableParams = { userid: userinfo.userid,pageno:_this.currentPage,pagesize:_this.SizePage,startTime:_this.StartTime,endTime:_this.EndTime,sortbycreatetime:_this.sortBycreatetime,sortbyverfiytime:_this.sortByverfiytime,status:_this.Status};
			_this.$http.post('http://api.75177.com/api/ptb/getrechargerecordlist', recordTableParams , {headers: {},emulateJSON: true}).then(
				function(response){
					let { msg, code } = response.data;
					if( code == "0"){
						_this.recordTable = response.data.data.data;
						_this.Total = response.data.data.page.totalCount;
					}else{
						_this.$message.error(msg);
					}
				},function(response) {
				    // 这里是处理错误的回调
				    console.log(response)
				}
			);
    	},
    	handleSizeChange(val) {
    		var _this = this;
    		_this.SizePage = val;
    		_this.changePage();
	    },
	    handleCurrentChange(val) {
	    	var _this = this;
	        _this.currentPage = val;
	        _this.changePage();
	    },
	    viewDetails(index){
	    	var _this = this;
	    	_this.$http.post('http://api.75177.com/api/ptb/getrecordbyid', {orderid:_this.recordTable[index].order_id} , {headers: {},emulateJSON: true}).then(
				function(response){
					let { msg, code } = response.data;	
					if(code !== "0"){
						_this.$confirm('', '友情提醒', {
		     				message1:'',
		     				message2:'查看失败',
	     					message:msg,
				        	confirmButtonText: '关闭',
				        	showCancelButton:false,
				        	closeOnClickModal:false,
				        	showclose:false
				        }).then(() => {
				        	
				        }).catch(() => {
				          	    
				        });
					}else{
						_this.recdetForm.owner = response.data.data.owner;
						_this.recdetForm.cardno = response.data.data.cardno;
						_this.recdetForm.bankname = response.data.data.bankname;
						_this.recdetForm.amount = "￥ "+response.data.data.amount;
						_this.recdetForm.pzpic = response.data.data.pzpic;
						_this.recdetForm.status = response.data.data.status;
						_this.recdetForm.create_time = response.data.data.create_time;
						_this.recdetForm.verify_time = response.data.data.verify_time;
						 _this.analysisStats();
						_this.dialogFormVisible = true;
					}
				},function(response) {
				    // 这里是处理错误的回调
				    console.log(response)
				}
			);
	    },
	    analysisStats(){
	    	var _this =this;
	    	if( _this.recdetForm.status == 1 ){
	    		_this.analysisStatsstep = '1';
	    		_this.analysisStatstext = '充值到账'
	    	}else if ( _this.recdetForm.status == 2 ){ 
	    		_this.analysisStatsstep = '2';
	    		_this.analysisStatstext = '充值到账'
	    	}else if( _this.recdetForm.status == 3 ){
	    		_this.analysisStatsstep = '2';
	    		_this.analysisStatstext = '驳回'
	    	}
	    }
   	},
	mounted: function() {
		var _this = this;
    	_this.changePage();
    	Date.prototype.Format = function (fmt) {
		    var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "H+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}
	}
}
</script>