<template>
	<div class="listContainer">
		<swiper indicator-dots="true" indicator-color="rgba(185, 185, 185,0.6)"
		indicator-active-color="rgba(65, 168, 99, 0.8)" autoplay="true" interval="3000"
		duration="1000" circular="true">
			<swiper-item>
				<img src="/static/image/wimg1.jpg" >
			</swiper-item>
			<swiper-item>
				<img src="/static/image/wimg2.jpg" >
			</swiper-item>
		</swiper>
		<ListTmp v-for="(item,index) in listArr" :key="index" :item=item,index />
	</div>
</template>

<script>
	import {mapState} from "vuex"
	import ListTmp from '../list_template/list_template.vue'
	export default{
		components: {ListTmp},
		// 分发action修改状态
		beforeMount(){
		this.$store.dispatch('getList')
		},
		// 映射状态到本地组件
		computed:{
			...mapState(['listArr'])
		}
	}
</script>

<style scoped>
	.listContainer{
		width: 100%;
		height: 400rpx;
	}
	.listContainer swiper img{
		width: 100%;
		height: 100%;
	}
</style>
