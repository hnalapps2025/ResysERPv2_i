'use strict';
$(document).ready(function() {
    $(window).on("load",function() {
        $('.preloader img').fadeOut();
        $('.preloader').fadeOut(1000);
    });
        new WOW().init();
        $('#login_validator').bootstrapValidator({
            fields: {
                usuario: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese Usuario'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Ingrese Contraseña'
                        }
                    }
                }
            }
        });
});
