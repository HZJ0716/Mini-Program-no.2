<template>
	<div class="index-Container">
		<img class="avatarImg" :src="userInfo.avatarUrl" />
		<p class="username">你好 {{userInfo.nickName}}</p>
		<div class="wrap">
			<button v-if="isShow" open-type="getUserInfo" @getuserinfo.stop="getUserInfo">授权</button>
			<button @tap.stop="tolist" v-else class="start">开启微信之旅</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				userInfo: {},
				isShow: true // 用户未授权
			}
		},
		methods:{
			// 判断用户是否授权
			getUserInfo(data){
				if(data.mp.detail.rawData){
					this.handleUserInfo();
				}	
			},
			// 获取用户信息
			handleUserInfo(){
				wx.getUserInfo({
					success:(data) => {
						this.userInfo = data.userInfo
						this.isShow = false
					},
					fail:() =>{
						
					}
				})
			},
			tolist(){
				wx.switchTab({
					url: '/pages/list/main'
				})
			}
		},
		beforeMount(){
			this.handleUserInfo();
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	.index-Container{
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgb(179, 238, 58);
	}
	.avatarImg{
		margin: 100rpx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		magrin: 100rpx 0;
	}
	.username{
		font-size: 40rpx;
		font-weight: bold;
		margin: 100rpx 0;
	}
	.wrap{
		position: relative;
	}
	button{
		margin: 20rpx;
		width: 220rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 24rpx;
		font-weight: bold;
		border-radius: 10rpx;
		border: 1rpx solid rgba(28, 160, 53,0.8);
		background: rgb(179, 238, 58);
	}
</style>
