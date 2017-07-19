//recode btn
function recodeChange() {
    $("#recode").css("display", "none");
    $("#recode-stop").css("display", "block");
    $("#recode-play").prop('disabled', true);
    $("#basic-play").prop('disabled', true);
}

function recodeChange2() {
    $("#recode-stop").css("display", "none");
    $("#recode").css("display", "block");
}

//recode-play btn
function playChange() {
    $("#recode-play").css("display", "none");
    $("#play-stop").css("display", "block");
    $("#recode").prop('disabled', true);
    $("#basic-play").prop('disabled', true);
}

function playChange2() {
    $("#play-stop").css("display", "none");
    $("#recode-play").css("display", "block");
}

//basic-play btn
function basicChange() {
    $("#basic-play").css("display", "none");
    $("#basic-stop").css("display", "block");
    $("#recode").prop('disabled', true);
    $("#recode-play").prop('disabled', true);
}

function basicChange2() {
    $("#basic-stop").css("display", "none");
    $("#basic-play").css("display", "block");
}



function resetBtn() {
    $("#recode-stop").css("display", "none");
    $("#play-stop").css("display", "none");
    $("#basic-stop").css("display", "none");
    $("#recode").css("display", "block");
    $("#recode-play").css("display", "block");
    $("#basic-play").css("display", "block");
    $("#recode").prop('disabled', false)
    $("#recode-play").prop('disabled', false);
    $("#basic-play").prop('disabled', false);
}
