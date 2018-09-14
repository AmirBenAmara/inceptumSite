;(function($) {
    $(function() {
        initMailer();
    });

    function initMailer() {
        if (!$.fn.validator) {
            return;
        }

        $('.js-ContactForm').validator().on('submit', function(e) {
            var $form     = $(this),
                $btn      = $form.find('[type="submit"]'),
                $response = $('<div />', {
                    'class': 'alert u-MarginTop20 js-Response',
                    'style': 'display:none'
                    });

            if (!$form.data('isready')) {
                $btn.after($response);
                $form.data('isready', true);
            }

            if (e.isDefaultPrevented()) {
                return;
            }
            e.preventDefault();

            $.post(
                'mailer/mailer.php',
                $form.serialize()
            ).done(function(r) {
                var $response = $form.find('.js-Response');
                if (r.success) {
                    $response
                        .removeClass('alert-warning')
                        .addClass('alert-success')
                        .text('Your message has been sent.')
                        .slideDown()
                        .delay(1000)
                        .slideUp();
                } else {
                    $response
                        .removeClass('alert-success')
                        .addClass('alert-warning')
                        .text('There is something wrong, try again!')
                        .slideDown()
                        .delay(1000)
                        .slideUp();
                }
            });
        });
    }
}(jQuery))
