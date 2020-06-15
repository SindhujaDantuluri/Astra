$(document).ready(function() {
    $('#CMD').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13') {
            $.ajax({
                type: "POST",
                url: "/commandline",
              contentType: 'application/json',
              dataType: 'json',
                data: JSON.stringify({
                    "data": $("#CMD").val(),
                }),
                success: function(data) {
                    $('#response').text(data.res);
                },
                fail: function() {
                    alert("Failed")
                }
            });
        }
    });
});



$(document).ready(function(){
  $('#button').click(function(){
    $(this).toggleClass('on');
  });
});



// var value="";
function openVideo(evt, blockname) {
  var i, tabcontent, tablinks;
  value=blockname;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(blockname).style.display = "block";
  evt.currentTarget.className += " active";
}
// function get_value()
// {
//     return value;
// }