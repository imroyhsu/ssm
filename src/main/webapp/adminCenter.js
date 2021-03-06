$(function () {
	$("#search").click(function(){
		queryUserByID($("#userId").val());
	});
	$("#exit").click(function(){
		sessionStorage.clear();
		$.ajax({
			url: 'http://localhost:8080/qq/user/logoff',
			type: 'GET',
			success:function(data) {
				console.log(data);
				if (data.status == true){
					location.href="./login.html";
				}else{
					alert(data.errorMsg);
				}
			},
			error : function(data) {
				console.log(data);
				alert("网络异常！");
			}
		})
	});
	queryAllFriends();
});
function queryAllFriends(){
	$.ajax({
		      url:'http://localhost:8080/qq/user/getFriendsList',
		      type:'GET',  
		      'contentType' : 'application/json',  
	          'data' : "",  
	          'dataType' : 'json',   
		      success:function(data) {
		      	if (data.status == true){
		      		var html = '';
			      	var dataArray = data.resultObj;
			      	for (var i = 0;i < dataArray.length;i++){
						var data1 = dataArray[i];
						var status = data1.isOnline==true?'是':'否';
						html = html + '<tr><td>' + data1.friendId + '</td><td>' + data1.lastLoginTime + '</td><td>' + status +
							'</td><td>' + "<input type='button' class='btn' value='删除' onclick=\"deleteFriends('" + data1.friendId + "')\">" +
							"<input type='button' class='btn' value='聊天' style='margin-left:10px' onclick=\"chat('"+ data1.friendId +"')\">" + '</td>';
		      		}
					$("#studentScore_table").html(html);
		      	}else{
					alert(data.errorMsg); 
		      	}
			  },
		      error : function(data) {
		        alert("网络异常！");  
			  }
		   	});
}

function chat(friendId) {
	location.href="./chat.html?friendId=" + friendId;
}

function queryUserByID(userId){
	var jsonData = {
		"userId": userId
	};
	$.ajax({
		url:'http://localhost:8080/qq/user/findFriend',
		type:'GET',
		'contentType' : 'application/json',
		'data' : jsonData,
		'dataType' : 'json',
		success:function(data) {
			var html = '';
			var data = data.resultObj;
			html += "<li ><a>" + data.userId + "</a><input type='button' class='btn' value='添加好友' onclick=\"makeFriends('" + data.userId + "')\"></li>";
			$("#adminCenter_leftMenu").html(html);
		},
		error : function(data) {
			alert("网络异常！");
		}
	});
}
function makeFriends(userId){
	var jsonData = {
		"sUserId": userId
	};
	$.ajax({  
		url:'http://localhost:8080/qq/user/makeFriend',
		type:'GET',
		'contentType' : 'application/json',
		'data' : jsonData,
		'dataType' : 'json',
		success:function(data) {
			if (data.status == true) {
				queryAllFriends();
			} else {
				alert(data.errorMsg);
			}
		},
		error : function(data) {
			alert("网络异常！");
		}
	});
}
function deleteFriends(userId){
	var jsonData = {
		"sUserId": userId
	};
	$.ajax({
	      url:'http://localhost:8080/qq/user/cancelFriend',
	      type:'GET',
	      'contentType' : 'application/json',  
          'data' : jsonData,
          'dataType' : 'json',   
	      success:function(data) {  
	      	if (data.status == true){
	      		queryAllFriends();
	      	}else{
	      		alert(data.errorMsg);
	      	}
		  },
	      error : function(data) {
	        alert("网络异常！");  
		  }
	   	});
}
