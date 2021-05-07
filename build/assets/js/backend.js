document.addEventListener('DOMContentLoaded', () => {
    var forms = [
        document.querySelector('#callback-form'),
        document.querySelector('#callback-form-simple'),
        document.querySelector('#contact-us-form'),
        document.querySelector('#calculator-form')
    ];

    forms.forEach(function(form) {
        if (!form) {
            console.log('Form is null', forms);
            return;
        }
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (
                $(form)
                    .parsley()
                    .isValid()
            ) {
                $.ajax({
                    url:      "form.php", 
                    type:     "POST",
                    dataType: "html",
                    data: $("#"+form.id).serialize(),
                    success: function(response) {
                        window.openModal('#success');
                    },
                    error: function(response) {
                        console.log("Форма не работает");
                    }
                });
                form.reset();
                $(form)
                    .parsley()
                    .reset();
            }
        });
    });
});
