var
    load_trigger_table = function () {
        "use strict";

        $.get("/filtering/trigger/list/"+$('#current_channel').val(), function (data) {
            $('#trigger_list_tbody').empty();

            if (data.length > 0) {
                $('#no_triggers_message').hide();
                $('#trigger_list_table').show();
                //alert(JSON.stringify(data));
                $.each(data, function (idx, elem) {

                    $('#trigger_list_tbody').append(
                        "<tr>" +
                            "<td>" + elem.text + "</td>" +
                            "<td><a id='delete_trigger_" + elem.id +"' class='delete_trigger' " +
                            "title='Haga click para eliminar disparador' href='#delete_confirm_modal' data-toggle='modal'>" +
                            "<span class='badge badge-important' contenteditable='false'>x</span></a>" + "</td>" +
                        "</tr>"
                    );

                    $('#delete_trigger_' + elem.id).click(function () {
                        $('#deleting_trigger_text').text(elem.text);
                        $('#deleting_trigger_id').val(elem.id);
                    });
                });
            }else{
                $('#trigger_list_table').hide();
                $('#no_triggers_message').show();
            }
        });
    },

    trigger_add_error = function (text) {
        "use strict";

        $('#alert_warning_body').text(text);
        $('#alert_warning').show();
    },

    submit_new_trigger = function () {
        "use strict";

        $.post("/filtering/trigger/add/", {
            'trigger_text': $('#add_trigger_text').val(),
            'trigger_channel': $('#current_channel').val()
        }, function (data) {

            $('#add_trigger_text').val("");
            if(data.result === "ok") {
                load_trigger_table();
            }else{
                trigger_add_error(data.result);
            }
        });
    };

$(document).ready(function () {
    "use strict";

    $('#trigger_list_table').hide();
    $('#no_triggers_message').hide();

    load_trigger_table();

    $('#delete_trigger_confirmed').click(function () {
        $.post("/filtering/trigger/delete/" + $('#deleting_trigger_id').val(), function (data) {
            if(data.result === "ok") {
                load_trigger_table();
            }
        });
    });

    $('#add_trigger_btn').click(function () {
        submit_new_trigger();
    });

    $('#add_trigger_text').keypress(function (e) {
        if (e.which === 13) {
            submit_new_trigger();
        }
    });
});