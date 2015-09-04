var displayedAssignments = [];

//function that is called ever 5 seconds setinterval
function refresh() {

    // does ajax call to assignments/ajax route (on assignments.js)
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/assignments/ajax"
    }).done(function (response, textStatus, jqXHR) {
        console.log("getting");
        if (response.length != displayedAssignments.length){
            updateDOM(response);
            displayedAssignments = response;
        } else {
            console.log("no change");
        }

    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    })
}

// updates the dom in the callback of assignments/ajax
function updateDOM(response){
    $('#assignments').children().remove();
    //for each of the objects returned in the ajax call
    response.forEach(function(assignment, index){

        //format the date property
        var d = moment(assignment.date_completed).format("MM-DD-YYYY");

        //create container for each assignment
        var $studentDiv = $('<div class="student-div">');

        var $p= $('<p>');

        //format the paragraph tag to be appended to the container div
        $p.text(assignment.name +"; "+assignment.assignment_name + "; " +assignment.score+"; "+ d);
        $studentDiv.append($p);

        //create button and add unique class id of assignment id
        var $button = $('<button>delete</button>');
        $button.addClass(assignment._id);

        //append button and student container to the dom (for each)
        $('#assignments').append($studentDiv);
        $('#assignments').append($button);
    });


}

$(document).ready(function(){

//every 5 seconds do refresh (defined above)
setInterval(refresh, 5000);

    //when the form is submitted
    $('form').on('submit',function(e){

        //prevent page refresh
        e.preventDefault();

        //creates varriables from form data
        var name = $(this).serializeArray()[0].value;
        var assignment_name = $(this).serializeArray()[1].value;
        var score = $(this).serializeArray()[2].value;
        var date_completed = $(this).serializeArray()[3].value;

        //compile form data into object to send
        var newAssignment = {
            name: name,
            assignment_name: assignment_name,
            score: score,
            date_completed: date_completed
        };

        $.ajax({
            url: '/assignments',
            type:'POST',
            //send new assignment object created above
            data: newAssignment,
            dataType: 'json'
        }).done(function(response, textStatus, jqXHR){
            console.log("Success??");
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            console.log('I done made the call!');
        });
    });

    //selects body and looks for any button that exists on the dom (lazy way to do this)
    $('body').on('click', 'button', function(){

        //set clicked button to font color red to indicate deletion
        $(this).css('color','red');

        $.ajax({

            //ajax call to the specific assignment route by unique id
            url: '/assignments/'+$(this).attr('class'),
            type: 'DELETE'
        }).done(function(response, textStatus, jqXHR){
            console.log("Deleted something???");
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            console.log('I done made the call!');
        });
    })
});