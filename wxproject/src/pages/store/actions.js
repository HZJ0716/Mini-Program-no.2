import {RECEIVE_LIST,MOVIEARR} from "./mutations-type"
import listData from "../../../static/datas/list_data"
export default{
	getList({commit}){
		//	触发对应的mutations
		commit(RECEIVE_LIST,listData)
	},
	getMovie({commit},data){
		//	触发对应的mutations
		commit(MOVIEARR,data)
	}
}