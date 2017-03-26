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

$(document).on("click", "input[type='checkbox']", function(){
  if($(this).prop("checked") ===  true) {
    console.log("cbox checked");
  } else if ($(this).prop("checked") ===  false) {
    console.log("cbox unchecked");
  }
});

removeItem();
    // }
}); //end document.ready


function moveItem(){

}

function removeItem(){
  $(document).on("click", ".delete", function(){
      console.log("delete clicked");
    var listItem = $(this).data('id');
    console.log(listItem);

    $.ajax({
      type: "DELETE",
      url: "todo/delete/" + listItem,
      success: function(){
        getList();
      }
    });
  });
}

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
        $el.append('<td><input type="checkbox" id="cbox" value="checkbox"></td>');
        $el.append('<td class="false" id="listItem">' + todo.task + '</td>');
        $el.append('<td><button class="delete" data-id="' + todo.id + '">X</button></td>');
        }
    }
  });
}
