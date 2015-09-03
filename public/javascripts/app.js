function refresh() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/assignments/ajax"
    }).done(function (response, textStatus, jqXHR) {
        console.log("getting");
        console.log(response);
        updateDOM(response);
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    })
}

function updateDOM(response){
    $('#assignments').children().remove();
    response.forEach(function(assignment, index){
        var d = assignment.date_completed;
        d= d.toDateString();
        var $studentDiv = $('<div class="student-div">');

        var $p= $('<p>');
        $p.text(assignment.name +"; "+assignment.assignment_name + "; " +assignment.score+"; "+ d);
        $studentDiv.append($p);
        $('#assignments').append($studentDiv);
    });


}

$(document).ready(function(){

setInterval(refresh, 5000);
});




