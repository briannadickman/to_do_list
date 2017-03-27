var listId;

$(document).ready(function(){
  console.log("jQuery sourced!");
  addItem();
  getList();
  checkboxClick();
  removeItem();
  });

// ADD ITEM
function addItem(){
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
}

//  CHECKBOX
function checkboxClick() {
  $(document).on("click", "input[type='checkbox']", function(){
    if($(this).prop("checked") ===  true) {
      console.log("cbox checked");
      listId = $(this).parent().parent();
      listId.removeClass('false');
      listId.addClass('true');
      // updateItem();
      // console.log($(this).);
    } else if ($(this).prop("checked") ===  false) {
      console.log("cbox unchecked");
      listId = $(this).parent().parent();
      listId.removeClass('true');
      listId.addClass('false');
      // updateItem();
    }
  });
}

//  UPDATE ITEM
function updateItem(){

  $.ajax({
    type: "PUT",
    url: "/todo/change",
    data: {id: listId},
    success: function(){
      console.log(response);

    }
  });
  getList();
}

//  REMOVE ITEM
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

// GET ITEMS
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
        if(todo.complete === false) {
              $("#items_to_do").append("<tr class=" + todo.complete + "></tr>");
              var $el = $("#items_to_do").children().last();
              $el.append('<td><input type="checkbox" data-id="' + todo.id + '" value="checkbox"></td>');
              $el.append('<td class="listItem">' + todo.task + '</td>');
              $el.append('<td><button class="delete" data-id="' + todo.id + '">X</button></td>');
        } else if (todo.complete === true) {
              $("#finished_items").append("<tr class=" + todo.complete + "></tr>");
              var $el1 = $("#finished_items").children().last();
              $el1.append('<td><input type="checkbox" data-id="' + todo.id + '" value="checkbox"></td>');
              $el1.append('<td class="listItem">' + todo.task + '</td>');
              $el1.append('<td><button class="delete" data-id="' + todo.id + '">X</button></td>');
      }
        }
    }
  });
}
