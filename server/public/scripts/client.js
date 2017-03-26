$(document).ready(function(){
  console.log("jQuery sourced!");
  // addItem();

  $('#todo_form').on("submit", function(){
    event.preventDefault();
    console.log($("#new_item").val());
    // function addItem()
    //   console.log("addItem running");
      $.ajax({
        type: "POST",
        url: "/todo/add",
        data: {task: $("#new_item").val()},
        success: function(response){
          // console.log(response);
          getList();
        }
      });
        $("#new_item").val('');
    });
      getList();

    // }
}); //end document.ready

function getList(){
  console.log("getList running");
  $.ajax({
    type: "GET",
    url: "/todo",
    success: function(response){
      console.log(response);
      $("#items_to_do").empty();
      for (var i = 0; i < response.length; i++) {
        var todo = response[i];
        $("#items_to_do").append("<tr></tr>");
        var $el = $("#items_to_do").children().last();
        $el.append('<td><input type="checkbox" id="cbox' + todo.id + ' "value="checkbox"></td>');
        $el.append('<td>' + todo.task + '</td>');
        }
    }
  });
}
