<template>
	<div>
		<div class="movieContanier">
			<img :src="moviesArr.images.large">
			<span class="movieName">{{moviesArr.title}}</span>
			<div class="movieInfo">
				<span class="score">评分: {{moviesArr.rating.average}}</span>
				<span class="director">导演: {{moviesArr.directors[0].name}}</span>
				<span class="avatar">主演: {{moviesArr.casts[1].name}}</span>
			</div>
			<button>我爱观影</button>
		</div>
	</div>
</template>

<script>
	import {mapState} from "vuex"
	export default{
		computed:{
			...mapState(['movieArr'])
		},
		data(){
			return {
				moviesArr: {}
			}
		},
		beforeMount(){
			this.moviesArr = this.movieArr[this.$mp.query.index]
		}
	}
</script>

<style scoped>
	.movieContanier{
		display: flex;
		flex-direction: column;
		 align-items: center;
	}
	.movieContanier img{
		 width: 85%;
		  height: 700rpx;
		  margin: 20rpx 0;
	}
	.movieName{
		margin-top: 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
	}
	.movieInfo{
		display: flex;
		flex-direction: column;
		margin: 10rpx 0;
	}
	button{
		margin-top: 20rpx;
		width: 80%;
		height: 100rpx;	
		background: rgba(179, 238, 58,0.8);
		color: black;
	}
</style>
