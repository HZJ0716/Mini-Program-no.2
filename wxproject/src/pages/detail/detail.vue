<template>
	<div class="detail_Container">
		<img class="detail_header" :src="isMusicPlay?detailObj.music.coverImgUrl:detailObj.detail_img">
		<img @tap="handleMusic" class="music_img" :src="isMusicPlay?'/static/image/musicStop.png':'/static/image/music.png'">
		<div class="avatar_data">
			<img class="avatarImg" :src="detailObj.avatar">
			<span>{{detailObj.author}}</span>
			<span>发布与</span>
			<span>{{detailObj.date}}</span>
		</div>
		<p class="detail_info">{{detailObj.title}}</p>
		<div class="detail_star">
			<div class="share_star">
				<img @tap="handleShare" :src="detailObj.detail_love_image4">
				<img @tap="handleCollect" :src="isCollect?'/static/image/icon4.png':'/static/image/icon3.png'">
			</div>
			<div class="line"></div>
		</div>
		<button open-type="share">转发</button>
		<p class="content">{{detailObj.detail_content}}</p>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import isPlayObj from "../data/data.js"
	const BackgroundAudioManager = wx.getBackgroundAudioManager()
	export default{
		data(){
			return{
				detailObj: {},
				isCollect: false ,// 是否收藏,
				isMusicPlay: false
			}
		},
		methods:{
			handleCollect(){
				// 修改状态
				let isCollect = !this.isCollect;
				this.isCollect = isCollect;
				let title = isCollect?'收藏成功':'取消收藏';
				wx.showToast({
					title,
					icon: 'success'
				})
				// 读取本地缓存收藏状态
				let oldStorage = wx.getStorageSync('isCollect')
				oldStorage[this.index] = isCollect
				// 将本次设置的结果再缓存
				wx.setStorage({
					key: 'isCollect',
					data: oldStorage
				})
			},
			// 控制分享设定
			handleShare(){
				wx.showActionSheet({
					itemList: ["分享到QQ","分享到朋友圈","分享给好友"],
					itemColor: "#EE4000"
				})
			},
			// 控制背景音乐播放	
			handleMusic(){
				let isMusicPlay = !this.isMusicPlay;
				this.isMusicPlay = isMusicPlay;
				let {dataUrl,title} = this.detailObj.music
				// 判断音乐是否播放
				if(isMusicPlay){
					BackgroundAudioManager.src= dataUrl;
					BackgroundAudioManager.title= title;
				}else{
					BackgroundAudioManager.pause();
				}
			}
		},
		beforeMount(){
			// 使用this.$mp.query.index取代onLoad中的options
			this.index = this.$mp.query.index;
			// 缓存预处理
			let oldStorage = wx.getStorageSync('isCollect')
			// 判断音乐播放
			if(isPlayObj.pageIndex == this.index && isPlayObj.isPlay){
				this.isMusicPlay = true
			}else{
				this.isMusicPlay = false
			}
			if(!oldStorage){
				wx.setStorage({
					key: 'isCollect',
					data: {}
				})
			}else{
				// 用户缓存过
				this.isCollect = oldStorage[this.index]?'true':'false'
				console.log(this.isCollect);
			}
			// 监听背景音乐播放
			BackgroundAudioManager.onPlay(() =>{
				this.isMusicPlay = true;
				isPlayObj.pageIndex = this.index;
				isPlayObj.isPlay = true;			
			});
			BackgroundAudioManager.onPause(() =>{
				this.isMusicPlay = false;
				isPlayObj.pageIndex = this.index;
				isPlayObj.isPlay = true;
			});
			BackgroundAudioManager.onStop(() =>{
				this.isMusicPlay = false;
				isPlayObj.pageIndex = this.index;
				isPlayObj.isPlay = true;
			});
		},
		mounted(){
			// 更新state中的数据
			this.detailObj = this.listArr[this.index]
		},
		computed:{
			...mapState(['listArr'])
		}
	}
</script>

<style scoped>
	.detail_Container{
		display: flex;
		flex-direction: column;
		border: 1 solid rgba(204, 204, 204, 0.5);
	}
	.detail_header{
		width: 100%;
		height: 460rpx;
	}
	.avatar_data{
		padding: 10rpx;
	}
	.avatarImg{
		width:64rpx;
		height: 64rpx;
		border-radius: 50%;
		vertical-align: middle;
	}
	.avatar_data span{
		font-size: 32rpx;
		margin-left: 20rpx;
		color: #333;
	}
	.detail_info{
		font-size: 40rpx;
		font-weight: bold;
		padding: 10rpx;
	}
	.share_star img{
		float: right;
		margin-right: 30rpx;
		width: 90rpx;
		height: 90rpx;
	}
	.detail_star{
		position: relative;
	}
	.line{
		position: absolute;
		top: 45rpx;
		left: 5%;
		width: 90%;
		height: 5rpx;
		background: rgba(155, 155, 155, 0.5);
		z-index: -1;
	}
	.content{
		padding: 20rpx;
		font-size: 34rpx;
		text-indent: 34rpx;
		line-height: 1.5;
		white-space: 5rpx;
	}
	button{
		background:rgba(179, 238, 58,0.5);
		width: 30%;
		height: 10%;
		font-size: 34rpx;
	}
	.music_img{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		top: 200rpx;
		left: 50%;
		margin-left: -30rpx;
	}
</style>
