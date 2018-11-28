$(document).ready(() => {
    let child = 3;
    let available = true;
    $(".slide-bar-item").click(e => {
        if (available) {
            available = false;
            $(".active").removeClass("active");
            $(e.currentTarget).addClass("active");
            child = +$(e.currentTarget).attr("id")[1] + 2;
            let multiplicator = child - 3;
            let width = $(".slide-container").width() + (+$(".block-container").css("margin-right").split("px")[0]);
            let shift = -(multiplicator * width) + "px";
            $(".block-container").css("left", shift);
            setTimeout(() => {
                console.log(child);
                available = true;
            }, 300)
        }
    });
    var popular = document.getElementById("popular");
    var sticky = popular.offsetTop;
    var bottom = document.getElementById("callback").offsetTop;
    var next = document.getElementById("next");
    var prev = document.getElementById("prev");
    window.onscroll = function () {
        if ((window.pageYOffset >= sticky) && (window.pageYOffset <= bottom - 500)) {
            next.classList.add("sticky");
            prev.classList.add("sticky");
        } else {
            next.classList.remove("sticky");
            prev.classList.remove("sticky");
        }
        console.log(sticky, window.pageYOffset, bottom)
    };


    $("#next").click(() => {
        console.log(child)
        if ($("#next").hasClass("sticky")) {
            if (child >= 3 && child <= 5) {
                if (available) {
                    available = false;
                    child += 1;
                    let multiplicator = child - 3;
                    let width = $(".slide-container").width() + (+$(".block-container").css("margin-right").split("px")[0]);
                    let shift = -(multiplicator * width) + "px";
                    console.log(width);
                    console.log(shift);
                    $(".block-container").css("left", shift);
                    setTimeout(() => {
                        console.log(child);
                        available = true;
                    }, 300)
                }
            } else
            if (child < 9) {
                $(".slide-bar-item:nth-child(" + (child - 1) + ")").click();
            }
        }
    })

    $("#prev").click(() => {
        console.log(child)
        if ($("#prev").hasClass("sticky")) {
            if (child >= 5 && child <= 7) {
                $(".slide-bar-item:nth-child(" + (child - 3) + ")").click();
                $(".slide-bar-item:nth-child(" + (1) + ")").addClass("active");
            }
            if (child > 3) {
                $(".slide-bar-item:nth-child(" + (child - 3) + ")").click();
            }
        }
    })
    let info = false;
    $(".works-switcher").click(() => {
        $(".works-switcher-min").toggleClass("clicked");
        $(".works-switcher span").toggleClass("green-color white");
        if (info) {
            $(".works__info-container").toggleClass("opacity");
            setTimeout(() => {
                $(".works__photo-container").toggleClass("opacity");
            }, 300);
            info = false;;
        } else {
            $(".works__photo-container").toggleClass("opacity");
            setTimeout(() => {
                $(".works__info-container").toggleClass("opacity");
            }, 300);
            info = true;
        }
    })

    $(".get__consult").click(() => {
        $(".call__container").fadeIn(300);
        $("body").css("overflow-y", "auto");
        $(".header").css("left", "-100vw");
        $(".burger").removeClass("active");
    })
    $(".close").click(e => {
        $(".call__container").fadeOut(300);
        $(".smooth").fadeOut(300);
        $(".success").fadeOut(300);
        $(".mini__img").eq(0).attr("src", "");
        $(".mini__img").eq(1).attr("src", "");
        $(".mini__img").eq(2).attr("src", "");
    })

    $(".slide-item__callback").click(e => {
        $(".active__img").removeClass("active__img");
        $(".mini__img").eq(0).addClass("active__img");
        let img1 = $(e.currentTarget).parent().attr("data-img1"),
            img2 = $(e.currentTarget).parent().attr("data-img2"),
            img3 = $(e.currentTarget).siblings(".slide-item__img").attr("src");
        $(".mini__img").eq(0).attr("src", img3);
        $(".mini__img").eq(1).attr("src", img2);
        $(".mini__img").eq(2).attr("src", img1);
        $(".big__img").attr("src", img3);
        let name = $(e.currentTarget).siblings(".slide-item__name").html();

        let size = $(e.currentTarget).siblings(".slide-item__size").eq(0).html();
        size = size.split("-")[1];
        let sqr = $(e.currentTarget).siblings(".slide-item__size").eq(1).html();
        sqr = sqr.split("-")[1].split("площадь")[1];
        console.log(size, sqr);
        $(".smooth .slide-item__name").html(name);
        $(".smooth .size").html(size);
        $(".smooth .square").html(sqr);
        $(".smooth").fadeIn(300);


    })

    $(".mini__img").click(e => {
        if ($(e.currentTarget).attr("src") != "0") {
            $(".active__img").removeClass("active__img");
            $(e.currentTarget).addClass("active__img");
            $(".big__img").attr("src", $(e.currentTarget).attr("src"));
        }
    })
    let multiplicator1 = 0;
    $("#next1").click(() => {
        if (multiplicator1 < 5) {
            multiplicator1 += 1;
            let width = $(".works-slide").width() + (+$(".works-slide").css("margin-right").split("px")[0])
            let shift1 = -(multiplicator1 * (width)) + "px";
            $(".works-slide").css("left", shift1);
        } else {
            multiplicator1 = 0;
            let width = $(".works-slide").width() + (+$(".works-slide").css("margin-right").split("px")[0])
            let shift1 = -(multiplicator1 * (width)) + "px";
            $(".works-slide").css("left", shift1);
        }

    })

    $("#prev1").click(() => {
        if (multiplicator1 > 0) {
            multiplicator1 -= 1;
            let width = $(".works-slide").width() + (+$(".works-slide").css("margin-right").split("px")[0])
            let shift1 = -(multiplicator1 * (width)) + "px";
            $(".works-slide").css("left", shift1);
        } else {
            multiplicator1 = 5;
            let width = $(".works-slide").width() + (+$(".works-slide").css("margin-right").split("px")[0])
            let shift1 = -(multiplicator1 * (width)) + "px";
            $(".works-slide").css("left", shift1);
        }
    })


    $("form").submit(function (e) { //устанавливаем событие отправки для формы с id=form
        e.preventDefault();
        var form_data = $(e.currentTarget).serialize(); //собераем все данные из формы
        $.ajax({
            type: "POST", //Метод отправки
            url: "kurlyk.php", //путь до php фаила отправителя
            data: form_data,
            success: function () {
                $(".success").fadeIn(300);
            },
            error: function (e) {
                console.log(e);
                console.log("пиздецЭ");
            }
        });
    });
    $(".burger").click(() => {
        $(".burger").toggleClass("active")
        if ($(".burger").hasClass("active")) {
            $("body").css("overflow-y", "hidden");
            $(".header").css("left", "0");
        } else {
            $("body").css("overflow-y", "auto");
            $(".header").css("left", "-100vw")
        }
    })
    $(".header__nav-item a").click(() => {
        $(".burger").removeClass("active")
        $("body").css("overflow-y", "auto");
        $(".header").css("left", "-100vw")
    })
})