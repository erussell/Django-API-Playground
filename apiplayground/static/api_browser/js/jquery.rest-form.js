/*
*   restForm
*
*   fatiherikli at gmail dot com
*   http://fatiherikli.com
*
* */
!(function ($) {

    var GET = "GET",
        POST = "POST",
        PUT = "PUT",
        DELETE = "DELETE";

    $.fn.restForm = function (_options) {
        var options = $.extend({
            "presubmit": function () {},
            "submit": function () {},
            "complete": function () {}
        }, _options);

        var build_request_headers = function (method, url, data, content_type) {
            var result = [];
            result.push(method + " " + url); // method and url.
            result.push("Content-Type: " + content_type +"; charset=utf-8"); // content type
            if (!$.isEmptyObject(data)) {
                result.push(""); // blank line
                result.push(JSON.stringify(data)); // body
            }
            return result;
        };

        this.each(function () {
            $(this).submit(function () {
                var form = $(this);

                // firing presubmit event
                options.presubmit.call(this, form);

                var method = form.attr("method");
                var url = form.attr("action");
                var content_type = false;
                var data = "";
                var ajax_data = null;

                if(form.attr("enctype") == "multipart/form-data") {
                    data = new FormData(form[0]);
                    ajax_data = data;
                } else if(form.data('urlencoded')) {
                    data = form.serialize();
                    ajax_data = data;
                    content_type = "application/x-www-form-urlencoded";
                } else {
                    data = form.form2json();
                    ajax_data = JSON.stringify(data);
                    content_type = "application/json";
                }

                // firing submit event
                options.submit.call(this, form, build_request_headers(method, url, data, content_type));
                var ajax_parameters = {
                    url: url,
                    type: method,
                    data: ajax_data,
                    contentType: content_type,
                    dataType: 'json',
                    processData: false
                };

                if (method === GET) {
                    ajax_parameters.processData = true;
                    ajax_parameters.data = data;
                }

                // calling api resource
                $.ajax(ajax_parameters).complete(options.complete.bind(this, form));

                return false;

            });
        });
    };

})(window.jQuery);