
var
    getCookie = function (name) {
        "use strict";

        var
            cookieValue = null,
            cookies,
            i;

        if ( document.cookie && document.cookie != '') {
            cookies = document.cookie.split(';');
            for (i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },

    csrfSafeMethod = function (method) {
        "use strict";

        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    };

$(document).ready(function() {
    "use strict";

    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});