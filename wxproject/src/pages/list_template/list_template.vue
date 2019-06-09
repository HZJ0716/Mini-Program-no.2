<template>
	<div @tap="toDetail" class="tmpContaner">
		<div class="avatar_date">
			<img :src="item.avatar">
			<span>{{item.date}}</span>
		</div>
		<p class="company">{{item.title}}</p>
		<img class="detail_img" :src="item.detail_img">
		<p class="content">{{item.detail_content}}</p>
		<div class="view_star">
			<img :src="item.detail_love_image1">
			<span>{{item.love_count}}</span>
			<img :src="item.detail_love_image2">
			<span>{{item.attention_count}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:[
			'item','index'
		],
		methods:{
			// 跳转到详情页
			toDetail(){
				wx.navigateTo({
					url: '/pages/detail/main?index=' + this.index
				})
			}
		}
	}
</script>

<style scoped>
	.tmpContaner{
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid rgba(204, 204, 204, 0.8);
	}
	.avatar_date{
		padding: 20rpx;
	}
	.avatar_date img{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		vertical-align: middle;
	}
	.avatar_date span{
		font-size: 28rpx;
		color: #333;
		margin-left: 20rpx;
	}
	.company{
		font-size: 40rpx;
		font-weight: bold;
		padding: 20rpx;
	}
	.detail_img{
		height: 460rpx;
		width: 100%;
	}
	.content{
		padding: 20rpx;
		font-size: 32rpx;
		text-indent: 32rpx;
		line-height: 1.5;
	}
	.view_star img{
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
		margin-left: 20rpx;
	}
	.view_star span{
		font-size: 28rpx;
		color: 333;
		margin-left: 10rpx;
	}
</style>
