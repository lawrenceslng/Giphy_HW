var topics = ["dog","cat","boss"];
var numLimit = 10;
//api key BMF89JHkMWLiP7NXrHNhSHKhiH1VnJ8S
//createButtons(topics);
//function that creates a new button and append to html 
function createButtons(arr)
{
    $("#buttonDiv").html("");
    var arrLen = arr.length;
    var newButton;
    for(var i = 0; i < arrLen; i++)
    {
        //create new button
        newButton = $("<button class='topic'>");
        newButton.html(arr[i]);
        $("#buttonDiv").append(newButton);
    }
}

//function to access Giphy API

//javascript, jQuery
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });

$(document).on("click",".topic",function()
{
    var buttonText = $(this).html();
    //debugger;
    var url = "https://api.giphy.com/v1/gifs/search?api_key=BMF89JHkMWLiP7NXrHNhSHKhiH1VnJ8S&q="+buttonText+"&limit="+numLimit;
    $.ajax({url: url}).then(function(res){
        var newDiv;
        $("#gifDiv").html("");
        for(var i = 0;i<numLimit;i++)
        {
            newDiv = $("<div>");
            var rating = res.data[i].rating;
            var stillImg = res.data[i].images.fixed_height_still.url;
            var aniImg = res.data[i].images.fixed_height.url;
            newDiv.html("<span>Rating: "+rating+"</span><img src="+stillImg+" data-still='"+stillImg+"' data-animate='" +aniImg+"' data-state='still'>");
            //debugger;
            //<img class='hide' src="+res.data[i].images.fixed_height.url
            console.log(i);
            $("#gifDiv").append(newDiv);
        }
    })
});

$(document).on("click","img",function()
{
    console.log("img clicked");
    var imgProp = $(this);
    //debugger;
    if(imgProp.attr("data-state") == "still")
    {
        imgProp.attr("data-state","animate");
        imgProp.attr("src",imgProp.attr("data-animate"));
    }
    else
    {
        imgProp.attr("data-state","still");
        imgProp.attr("src",imgProp.attr("data-still"));
    }
})


//add input to button array, create button
$(document).on("click","#addTopic",function()
{
    event.preventDefault();
    var newTopic = $('#topic').val();
    $("#topic").val("");
    topics.push(newTopic);
    createButtons(topics);
})
