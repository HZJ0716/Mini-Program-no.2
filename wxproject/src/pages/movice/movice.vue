<template>
	<div class="movice_Container">
		<div @tap="toDetail(index)" class="moviceImg" v-for="(item,index) in moviceArr" :key="index">
			<img :src="item.images.large">
			<div class="movice_info">
				<span class="moviceName">{{item.title}}</span>
				<span class="moviceData">{{item.year}}</span>
				<span class="moviceAuthor">{{item.directors[0].name}}</span>
			</div>
			<span class="score">{{item.rating.average}}</span>
		</div>
	</div>
</template>

<script>
	const url = "http://t.yushu.im/v2/movie/top250";
	export default{
		data(){
			return {
				moviceArr: []
			}
		},
		methods:{
			toDetail(index){
				wx.navigateTo({
					url: "/pages/movieDetail/main?index=" + index
				})
			}
		},
		beforeMount(){
			// fly小程序中不可用axios
			this.$fly.get(url)
			.then((response) => {
				let moviceArr = response.data.subjects
				this.moviceArr = moviceArr
				this.$store.dispatch("getMovie",moviceArr)
				})
				.catch((error) => {
				console.log(error);
				});
		}
	}
</script>

<style scoped>
	.moviceImg{
		display: flex;
		padding: 10rpx;
		border-bottom: #666;
		border-bottom: 1rpx solid rgba(118, 118, 118,0.5);
	}
	.moviceImg img{
		width: 128rpx;
		height: 128rpx;
		margin-left: 20rpx;
	}
	.movice_info{
		width: 70%;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.moviceName{
		width: 70%;
		font-size: 34rpx;
		color: #666;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.moviceData{
		font-size: 28rpx;
		color: #999;
		margin: 5rpx 0;
	}
	.moviceAuthor{
		font-size: 32rpx;
		color: #666
	}
	.score{
		color: #FF0000;
		font-size: 40rpx;
		font-weight: bold;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}
</style>
