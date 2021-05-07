// grade ----------------------------------------------
var grade = [{
	text: '青铜',
	color: '#79716E',
	img: '/frame/青铜.png'
},{
	text: '白银',
	color: '#79716E',
	img: '/frame/白银.png'
},{
	text: '黄金',
	color: '#79716E',
	img: '/frame/黄金.png'
},{
	text: '铂金',
	color: '#79716E',
	img: '/frame/铂金.png'
},{
	text: '钻石',
	color: '#79716E',
	img: '/frame/1.png'
},{
	text: '大师',
	color: '#79716E',
	img: '/frame/大师.png'
},{
	text: '宗师',
	color: '#79716E',
	img: '/frame/宗师.png'
},{
	text: '王者',
	color: '#79716E',
	img: '/frame/王者.png'
}]

export function getGradeInfo(exp) {
	if(exp<0) return 'err';
	if(exp<100){
		return grade[0];  
	}
	else if(exp<150){
		return grade[1];  
	}
	else if(exp<400){
		return grade[2];  
	}
	else if(exp<900){
		return grade[3];  
	}
	else if(exp<1800){
		return grade[4];  
	}
	else if(exp<3600){
		return grade[5];  
	}
	else if(exp<8000){
		return grade[6];  
	}
	else if(exp<16000){
		return grade[7];  
	}
	else return grade[7];  
}
// --------------------------------------------------------



// Math tools ----------------------------------------------
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

// 首页数据刷新 ---------------------------------------------

import {index_project,index_talent,index_qa,dialogData,noticeData} from "./data.js";

export function index_data_refresh(current,num) {
	return new Promise((resolute, reject)=>{
		
		setTimeout(()=> {
			try{
				let list_ = [index_project,index_talent,index_qa];
			
				let curList = list_[current];
				let result = []
				for(let i=0;i<num;i++){
					result.push(curList[getRndInteger(0,curList.length)]);
					// console.log()
				}
				//模拟接口请求成功
				// console.log(result);
				resolute(result);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		},1000)
	})
}

// 用户认证相关解析 -----------------------------------------
export function getCertification(cert){
	switch(cert){
		// 未认证
		case 0:{
			let result = {
				color:"error",
				text:"来源未知",
				text2:"未认证"
			};
			return result;
			break;
		}
		case 1:{
			let result = {
				color:"primary",
				text:"在校学生",
				text2:"学生认证"
			};
			return result;
			break;
		}
		case 2:{
			let result = {
				color:"success",
				text:"在职教师",
				text2:"教师认证"
			};
			return result;
			break;
		}
		case 3:{
			let result = {
				color:"warning",
				text:"企业任职",
				text2:"职工认证"
			}
			return result;
			break;
		}
		default:{
			let result = {
				color:"error",
				text:"来源未知",
				text2:"未认证"
			};
			return result;
			break;
		}
	}
}
// 用户数据处理 ---------------------------------------------

export function getUserInfo(rawUserInfo){
	// 默认
	let defaultUser = {
		avatar: getApp().globalData.imgUrl+"/user/alias/alias (1).jpg",
		cert: 0
	}
	
	let result = {
		certification: getCertification(defaultUser.cert),
		grade: getGradeInfo(rawUserInfo.experience),
		userId: rawUserInfo.userId,
		alias: rawUserInfo.nickname,
		avatar: rawUserInfo.avatarUrl?rawUserInfo.avatarUrl:defaultUser.avatar,
		slogan: rawUserInfo.signature,
	};
	return result;
}


// 对话数据 ----------------------------------------------
export function getDialogData(pageNum,pageSize){
	return new Promise((resolute, reject)=>{
		
		setTimeout(()=> {
			try{
				let result = []
				for(let i=pageNum*pageSize;i<(pageNum+1)*pageSize;i++){
					if(i>dialogData.length) break;
					result.push(dialogData[i]);
				}
				resolute(result);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		},1000)
	})
}

export function getNoticeData(pageNum,pageSize){
	return new Promise((resolute, reject)=>{
		
		setTimeout(()=> {
			try{
				let result = []
				for(let i=pageNum*pageSize;i<(pageNum+1)*pageSize;i++){
					if(i>noticeData.length) break;
					result.push(dialogData[i]);
					
				}
				//模拟接口请求成功
				// console.log(result);
				resolute(result);
			} catch (e) {
				//模拟接口请求失败
				reject(e);
			}
		},1000)
	})
}