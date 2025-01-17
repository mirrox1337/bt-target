window.addEventListener('message', function(event) {
    let item = event.data;

    if (item.response == 'openTarget') {
        OpenTarget()
    } else if (item.response == 'closeTarget') {
        CloseTarget()
    } else if (item.response == 'foundTarget') {
        FoundTarget()
    } else if (item.response == 'validTarget') {
        ValidTarget(item)
    } else if (item.response == 'leftTarget') {
        LeftTarget()
    }
});

function FoundTarget() {
    $(".target-eye").css("color", "rgb(30,144,255)");
}

function OpenTarget() {
    $(".target-label").html("");

    $('.target-wrapper').show();

    $(".target-eye").css("color", "white");
}

function LeftTarget() {
    $(".target-label").html("");

    $(".target-eye").css("color", "white");
}

function CloseTarget() {
    $(".target-label").html("");
    $(".target-eye").css("color", "white");
    $('.target-wrapper').hide();
}

function ValidTarget(item) {
    $(".target-label").html("");
    $.each(item.data, function(index, item) {
        $(".target-label").append("<div id='target-" + index + "'<li><span class='target-icon'><i class='" + item.icon + "'></i></span>&nbsp" + item.label + "</li></div>");
        $("#target-" + index).hover((e) => {
            $("#target-" + index).css("color", e.type === "mouseenter" ? "rgb(30,144,255)" : "white")
        })

        $("#target-" + index + "").css("margin-bottom", "1vh");

        $("#target-" + index).data('TargetData', item);
    });
}

$(document).on('mousedown', (event) => {
    let element = event.target;
    let split = element.id.split("-");

    if (split[0] === 'target') {
        $(".target-label").html("");
        $('.target-wrapper').hide();
        switch (event.which) {
            case 1:
                $.post(`https://${GetParentResourceName()}/selectTarget`, JSON.stringify(Number(split[1]) + 1));
            case 3:
                $.post(`https://${GetParentResourceName()}/closeTarget`)
                break;
        }
    }
});

$(document).on('keydown', function(event) {
    if (event.key == 'Alt' || event.key == 'Escape') {
        CloseTarget()
        $.post(`https://${GetParentResourceName()}/closeTarget`)
    }
});
