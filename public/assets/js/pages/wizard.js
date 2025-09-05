'use strict';
$(document).ready(function() {
    $("#commentForm").bootstrapValidator({
        fields: {
            NroDocumento: {
                validators: {
                    notEmpty: {
                        message:'Ingrese un numero de Documento'
                    }
                }
            },
			IdPaciente: {
                validators: {
                    notEmpty: {
                        message:'Seleccione un Paciente'
                    }
                }
            },
			referencia: {
                validators: {
                    notEmpty: {
                        message:'Seleccione una Referencia'
                    }
                }
            },
			fecha: {
                validators: {
                    notEmpty: {
                        message:'Seleccione una Fecha'
                    }
                }
            },
			hora: {
                validators: {
                    notEmpty: {
                        message:'Seleccione una Hora'
                    }
                }
            },
			Email: {
                validators: {
                    notEmpty: {
                        message:'Ingrese su Correo Electronico'
                    },
                    regexp: {
                        regexp: /^\S+@\S{1,}\.\S{1,}$/,
                        message:'Ingrese un Correo Electronico Valido'
                    }
                }
            },
			Telefono: {
                validators: {
                    notEmpty: {
                        message:'Ingrese su Numero de Celular'
                    }
                }
            }
        }
    });
    $('#rootwizard').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'onNext': function(tab, navigation, index) {
			var $validator = $('#commentForm').data('bootstrapValidator').validate();
			var validacion=$validator.isValid();
			if(validacion)
			{
				switch(index)
				{
					case 1:
                        console.log("Revisanod referencia");
						$("#referencia").empty();
						jQuery.ajax({
							url:"bpcw",
							async:false,
							data:{NroDocumento:$("#NroDocumento").val().trim(),IdDocIdentidad:$("#IdDocIdentidad").val()},
							dataType:'json',
							method:"get",
							success:function(response)
							{
								if(response.resultado==2)
								{
									alert(response.mensaje);
									validacion=false;
								}
								else
								{								
									$("#datos_paciente").val(response.datos.ApellidoPaterno+' '+response.datos.ApellidoMaterno+' '+response.datos.PrimerNombre+' - '+$("#IdDocIdentidad option:selected").text()+' N° '+$("#NroDocumento").val().trim());
									$("#datos_paciente_f").val(response.datos.ApellidoPaterno+' '+response.datos.ApellidoMaterno+' '+response.datos.PrimerNombre+' - '+$("#IdDocIdentidad option:selected").text()+' N° '+$("#NroDocumento").val().trim());
									$("#Email").val(response.datos.Email);
									$("#Telefono").val(response.datos.Telefono);
									$("#referencia").append(new Option("Seleccione una referencia",""));
									jQuery.each(response.lista_referencias, function(i,item){
										$("#referencia").append(new Option(item,i));
									});
								}
							}
						});
						break;
					case 2:
						$("#especialidad_f").val($("#especialidad option:selected").html());
						$("#medico_f").val($("#medico option:selected").html());
						$("#fecha_f").val($("#fecha option:selected").html());
						$("#hora_f").val($("#hora option:selected").html());
						$("#Email_f").val($("#Email").val());
						$("#Telefono_f").val($("#Telefono").val());
						break;
					case 3:
						$('.bv-hidden-submit').removeAttr("disabled").click();
						break;
					default:
						alert(index);
				} 
			}
            return validacion;
        },
        'onPrevious': function(tab, navigation, index) {
            $(".userprofile_tab2").removeClass("tab_clr");
        },
        onTabClick: function(tab, navigation, index) {
            return false;
        },
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
            var $rootwizard= $('#rootwizard');
            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
				var c = $rootwizard.find('.pager .next .bs').children();
                $rootwizard.find('.pager .next .bs').text('Finalizar');
				$rootwizard.find('.pager .next .bs').append(c);
            } else {
                var c = $rootwizard.find('.pager .next .bs').children();
                $rootwizard.find('.pager .next .bs').text('Siguiente');
				$rootwizard.find('.pager .next .bs').append(c);
            }
        }});
});