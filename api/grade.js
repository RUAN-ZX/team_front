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


