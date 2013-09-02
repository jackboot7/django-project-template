/*global $, document, window, alert*/

var
    switch_row_style = function (name) {
        "use strict";

        var
            row = $('#channel_row_' + name),
            label = $('#label_status_' + name),
            link = $('#change_status_' + name);

        if(row.hasClass('success')){
            row.removeClass('success').addClass('error');
            label.removeClass('label-success').addClass('label-important');
            label.text("Inactivo");
            link.attr('title', "Haga click para activar el canal");
        }else{
            row.removeClass('error').addClass('success');
            label.removeClass('label-important').addClass('label-success');
            label.text("Activo");
            link.attr('title', "Haga click para desactivar el canal");
        }
    },

    load_channel_table = function () {
        "use strict";

        var
            row_class,
            label_class,
            link_title;

        $.get("/channels/list", function (data) {
            $('#channel_list_tbody').empty();

            if (data.length > 0) {
                $('#no_channels_message').hide();
                $('#channel_list_table').show();

                $.each(data, function (idx, elem){
                    if (elem.status === "Activo") {
                        row_class = "success";
                        label_class = "label-success";
                        link_title = "Haga click para desactivar el canal";
                    }else{
                        row_class = "error";
                        label_class = "label-important";
                        link_title = "Haga click para activar el canal";
                    }

                    $('#channel_list_tbody').append(
                        "<tr class='" + row_class + "' id='channel_row_" + elem.screen_name + "'>"+
                        "<td><a href='/channels/edit/" + elem.screen_name + "/'>" + elem.screen_name + "</a></td>" +
                        "<td>" + elem.last_tweet + "</td>" +
                        "<td><a title='" + link_title + "' class='channel_row' id='change_status_" +
                        elem.screen_name + "' href='#'>" +
                        "<span class='label " + label_class + "' id='label_status_"+ elem.screen_name+ "'>" +
                            elem.status + "</span></a></td>" +
                        "<td><a id='delete_channel_" + elem.screen_name +"' class='delete_channel' " +
                        "title='Haga click para eliminar canal' href='#delete_confirm_modal' data-toggle='modal'>" +
                        "<span class='badge badge-important' contenteditable='false'>x</span></a>" + "</td></tr>");

                    $('#delete_channel_' + elem.screen_name).click(function () {
                        $('#deleting_channel_id').text(elem.screen_name);
                    });

                    $('#change_status_' + elem.screen_name).click(function () {
                        $.post("/channels/changestatus/" + elem.screen_name, function (data) {
                            if(data.result === "ok") {
                                switch_row_style(elem.screen_name);
                            }
                        });
                    });
                });
            }else{
                $('#channel_list_table').hide();
                $('#no_channels_message').show();
            }
        });
    },

    channel_add_success = function () {
        "use strict";

        $('#alert_success_body').text("El canal fue suscrito exitosamente.");
        $('#alert_success').show();
    },

    channel_delete_success = function () {
        "use strict";

        $('#alert_success_body').text("El canal fue eliminado exitosamente.");
        $('#alert_success').show();
    };


$(document).ready(function () {
    "use strict";

    $('#channel_list_table').hide();
    $('#no_channels_message').hide();

    if($('#channel_added').val() === "true") {
        channel_add_success();
    }

    load_channel_table();

    $('#call_twitter_auth').click(function () {
        var
            screen_name = $("#screen_name").val();

        window.location.href = "/auth/authenticate/";
        //window.open("/auth/authenticate/" + screen_name);

    });

    $('#delete_channel_confirmed').click(function () {
        $.post("/channels/delete/" + $('#deleting_channel_id').text(), function (data) {
            if(data.result === "ok") {
                channel_delete_success();
                load_channel_table();
            }
        });
    });
});