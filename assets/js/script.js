function tryValidate() {
    if ($(".invalid").length != 0) {
        $("form button").addClass("unactive");
        $("form button").removeClass("active");
        $("form").off("submit");
        $("form").submit(function (e) {
            e.preventDefault();
        })

    } else {
        $("form button").addClass("active");
        $("form button").removeClass("unactive");
        $("form").off("submit");
        $("form").submit(function (e) {
            e.preventDefault();
            let data = $("form").serializeArray();
            console.log(data);
            console.log(data[0].value)
            $.ajax({
                beforeSend: function () {
                    $("form").get(0).reset();
                    $(".modal-container").fadeOut(300);
                    $("#name span").text(data[0].value);
                    $("#tel span").text(data[1].value);
                    $("#mail span").text(data[2].value);
                    $(".form-data").fadeIn(300);
                },
                success: function () {
                    // alert('Load was performed.');
                },
                error: function () {
                    // alert('Load was not performed.');
                }

            })
        })
    }
}

$(".main").click(function () {
   setTimeout(function(){
    $(".modal-container").fadeIn(300);
    $(".main").fadeOut(300);
   },5000)
})

$("form").submit(function (e) {
    e.preventDefault();
})
$("input").on("change", function () {
    let reg = new RegExp($(this).attr("pattern"));
    console.log(reg, $(this).val())
    if (reg.test($(this).val())) {
        console.log("okay")
        $(this).addClass("valid");
        $(this).removeClass("invalid");
        tryValidate();
    } else {
        $(this).addClass("invalid");
        $(this).removeClass("valid");
        $("form button").addClass("unactive");
        $("form button").removeClass("active");
    }
})

$(".reset").click(function () {
    $("#name span").text("");
    $("#tel span").text("");
    $("#mail span").text("");
    $(".form-data").fadeOut(300);
    $(".main").fadeIn(300);
})