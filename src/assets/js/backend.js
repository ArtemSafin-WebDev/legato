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
                console.log("�� ����� ��������� �����");
                console.log(form);
                $.ajax({
                    url:      "", //url �������� (action_ajax_form.php)
                    type:     "POST", //����� ��������
                    dataType: "html", //������ ������
                    data: $("#"+form).serialize(),  // ����������� ������
                    success: function(response) { //������ ���������� �������
                        console.log("����� ������");
                        window.openModal('#success');
                    },
                    error: function(response) { // ������ �� ����������
                        console.log("����� �����");
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
