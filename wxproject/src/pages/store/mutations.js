import {RECEIVE_LIST,MOVIEARR} from "./mutations-type"

export default{
	[RECEIVE_LIST](state,{list_data}){
		state.listArr = list_data
	},
	[MOVIEARR](state,data){
		state.movieArr = data
		console.log(state);
	}
}