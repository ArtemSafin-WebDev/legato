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
                console.log("Ща будет косольлог формы");
                console.log(form);
                $.ajax({
                    url:      "", //url страницы (action_ajax_form.php)
                    type:     "POST", //метод отправки
                    dataType: "html", //формат данных
                    data: $("#"+form).serialize(),  // Сеарилизуем объект
                    success: function(response) { //Данные отправлены успешно
                        console.log("ФОрма заебок");
                        window.openModal('#success');
                    },
                    error: function(response) { // Данные не отправлены
                        console.log("ФОрма хуйня");
                    }
                });
                form.reset();
                $(form)
                    .parsley()
                    .reset();

                window.openModal('#success');
            }
        });
    });
});
