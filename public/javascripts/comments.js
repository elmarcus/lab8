$(document).ready(function(){
    $("#serialize").click(function(){
	var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        if (minutes < 10){
            minutes = "0" + minutes;
        }
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        var v = hours + ":" + minutes + ":" + seconds + " ";
        if(hours > 11){
            v+="PM";
        } else {
            v+="AM"
        }
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val(), Time: v};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
	var url = "comment";
	
	$.ajax({
	  url:url,
	  type: "POST",
	  data: jobj,
	  contentType: "application/json; charset=utf-8",
	  success: function(data,textStatus) {
	      $("#done").html(textStatus);
	  }
	})
    });
	$("#getThem").click(function() {
      $.getJSON('comment', function(data) {
        console.log(data);
        var everything = "<ul>";
        for(var comment in data) {
          com = data[comment];
          everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "--Time: " + com.Time + "</li>";
        }
        everything += "</ul>";
        $("#comments").html(everything);
      })
    })

});
