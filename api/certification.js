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