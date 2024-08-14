"use strict";

$(document).ready(() => {
    var boxcarID = "";
    var tareCargoWeight = 0;
    var maxGrossWeight = 0;
    var cargoWeight = 0;
    var grossWeight = 0;
    var totalCargoWeight =0;

    const bx500MaxCargo = 90000;
    const bx505MaxCargo = 78000;
    const bx520MaxCargo = 70000;

    var bx500CargoNow = 0;
    var bx505CargoNow = 0;
    var bx520CargoNow = 0;

    var warehouseCargo = 0;

    var divDselected = "";

    $("#create_boxcar_id").click( () => {
        $("#divA").hide();
        $("#divB").show();
        $("#divC").show();
        $("#hr_id").show();
    })

    $("#add_freight_id").click( () => {
        $("#divA").hide();
        $("#divD").show();
    })

    $("#boxcar_data_id").click( () => {
        $("#divA").hide();
        $("#divC").show();
    })

    $("#warehouse_data_id").click( () => {
        $("#divA").hide();
        $("#divF").show();
    })

    $("#all_freight_status_id").click( () => {
        $("#divA").hide();
        $("#divG").show();
    })

    $("#return_to_main_page_id_b").click( () => {
        $(":radio").prop("checked",false);
        $("#divB").hide();
        $("#divA").show();
        $("#divC").hide();
        $("#hr_id").hide();
        resetFormDivB();

    })

    $("#return_to_main_page_id_g").click( () => {
        $(":radio").prop("checked",false);
        $("#divA").show();
        $("#divG").hide();
        resetFormDivB();
    })

    $("#return_to_main_page_id_f").click( () => {
        $(":radio").prop("checked",false);
        $("#divA").show();
        $("#divF").hide();
        $("h2").hide();
        resetFormDivB();
        $("#divD").hide();
    })

    $("#return_to_main_page_id_d").click( () => {
        $(":radio").prop("checked",false);
        $("#divA").show();
        $("#divD").hide();
        resetFormDivB();
        resetDivDForm();
        $("#divE").hide();

    })

    $("#return_to_main_page_id_c").click( () => {
        $(":radio").prop("checked",false);
        $("#divA").show();
        $("#divB").hide();
        $("#divC").hide();
        $("#hr_id").hide();
        resetFormDivB();
    })

    $("#return_to_create_box_car_id").click( () => {
        $(":radio").prop("checked",false);
        $("#divA").hide();
        $("#divB").show();
        $("#divC").show();
        $("#hr_id").show();
        resetFormDivB();
    })

    $("#divE_button2").click( () => {
        $("#divE").hide();
        $("#divA").show();
        $("#divD").hide();
        $(":radio").prop("checked",false);
    })

    $("#divE_button1").click( () => {
        $("#divE").show();
        $("#divD").show();
        $("#divA").hide();
        $(":radio").prop("checked",false);
    })


    const resetFormDivB = () => {
        $("#boxcar_id").val("");
        $("#tare_weight_id").val("");
        $("#max_gross_weight_id").val("");
        $("#span1").text("");
        $("#span2").text("");
        $("#span3").text("");
    } 
    
    $("#process_box_car_id").click( () => {
        const pattern1 = /^BX\d{3}$/;
        let isValid = true;

        if (pattern1.test($("#boxcar_id").val().trim())) {
            boxcarID = $("#boxcar_id").val();
        }else{
            $("#span1").text("must be BX followed by 3 digits");
            isValid = false;
        }

        if($("#tare_weight_id").val() > 0 && $("#tare_weight_id").val() < 20000){
            tareCargoWeight = parseInt($("#tare_weight_id").val());
        }else{
            $("#span2").text("must between 0 and 20000");
            isValid = false;
        }

        if($("#max_gross_weight_id").val() < 200000 && $("#max_gross_weight_id").val() > tareCargoWeight){
            maxGrossWeight = $("#max_gross_weight_id").val();
        }else{
            $("#span3").text("must greater than tare cargo weight and less than 200000");
            isValid = false;
        }

        if(isValid){
            $("#table1").append(`<tr><td>${boxcarID}</td><td>${tareCargoWeight}</td><td>${maxGrossWeight}</td><td></td><td>${cargoWeight + tareCargoWeight}</td></tr>`);
            totalCargoWeight += tareCargoWeight;
            grossWeight =  cargoWeight + tareCargoWeight;
            $("#td1").text(`Total Cargo Weight: ${totalCargoWeight}`); 
        }


    })

//div D
   
    $("#boxcar_select_id").click( () => {

        if($("#boxcar_select_id").val() == "BX500" || $("#boxcar_select_id").val() == "BX505" || $("#boxcar_select_id").val() == "BX520"){
            $("#divD_select_id").val($("#boxcar_select_id").val());
            $("#boxcar_select_id").prop('disabled', true);
            $("#transportID_id").prop('disabled', false);
            $("#description_id").prop('disabled', false);
            $("#divD_cargo_weight_id").prop('disabled', false);
            $("#divD_button1").prop('disabled', false);
            $("#divD_button2").prop('disabled', false);

            divDselected = $("#boxcar_select_id").val();
            //alert(divDselected);
        }
    })

    const resetDivDForm = () => {
        $("#divD_select_id").val("");
        $("#transportID_id").val("");
        $("#description_id").val("");
        $("#divD_cargo_weight_id").val("");
        $("select").val([]);

        $("#boxcar_select_id").prop('disabled', false);
        $("#transportID_id").prop('disabled', true);
        $("#description_id").prop('disabled', true);
        $("#divD_cargo_weight_id").prop('disabled', true);
        $("#divD_button1").prop('disabled', true);
        $("#divD_button2").prop('disabled', true);

        $("#span4").text("");
        $("#span5").text("");
        $("#span6").text("");
    }

    $("#divD_button2").click( () => {
        resetDivDForm();
    })


    $("#divD_button1").click( () => {
        let isPermitted = true;
        if($("#transportID_id").val().trim()){
            $("#span4").text("good");
        }else{
            $("#span4").text("must enter transport ID");
            isPermitted = false;
        }

        if($("#description_id").val().trim()){
            $("#span5").text("good");
        }else{
            $("#span5").text("must enter description");
            isPermitted = false;
        }

        if($("#divD_cargo_weight_id").val() <= 0){

            $("#span6").text("must be greater than 0");
            isPermitted = false;
        }

        if(isPermitted){
            

            let divDtransportID = $("#transportID_id").val();
            let divDdescription = $("#description_id").val();

            let cargoEntry = $("#divD_cargo_weight_id").val();
            if(divDselected == "BX500"){

                if(cargoEntry < (bx500MaxCargo - bx500CargoNow)){
                    $("#divE_tb").append(`<tr><td>${divDtransportID}</td><td>${divDdescription}</td><td>${cargoEntry}</td></tr>`);
                    bx500CargoNow += parseInt(cargoEntry);
                    $("#td2").text(`Total Cargo Weight: ${bx500CargoNow}`);
                    $("#divE").show();
                }else {

                    $("h2").show();
                    $("#divF").show();
                    $("#divF_tb").append(`<tr><td>${divDtransportID}</td><td>${divDdescription}</td><td>${cargoEntry}</td></tr>`);
                    warehouseCargo += parseInt(cargoEntry);
                    $("#td5").text(`Total Cargo Weight: ${warehouseCargo}`);

                }
            }

            if(divDselected == "BX505"){

                if(cargoEntry < (bx505MaxCargo - bx505CargoNow)){
                    $("#divE_tb2").append(`<tr><td>${divDtransportID}</td><td>${divDdescription}</td><td>${cargoEntry}</td></tr>`);
                    bx505CargoNow += parseInt(cargoEntry);
                    $("#td3").text(`Total Cargo Weight: ${bx505CargoNow}`);
                }else {

                    $("h2").show();
                    $("#divF").show();
                    $("#divF_tb").append(`<tr><td>${divDtransportID}</td><td>${divDdescription}</td><td>${cargoEntry}</td></tr>`);
                    warehouseCargo += parseInt(cargoEntry);
                    $("#td5").text(`Total Cargo Weight: ${warehouseCargo}`);

                }
            }

            if(divDselected == "BX520"){

                if(cargoEntry < (bx520MaxCargo - bx520CargoNow)){
                    $("#divE_tb3").append(`<tr><td>${divDtransportID}</td><td>${divDdescription}</td><td>${cargoEntry}</td></tr>`);
                    bx520CargoNow += parseInt(cargoEntry);
                    $("#td4").text(`Total Cargo Weight: ${bx520CargoNow}`);
                }else {

                    $("h2").show();
                    $("#divF").show();
                    $("#divF_tb").append(`<tr><td>${divDtransportID}</td><td>${divDdescription}</td><td>${cargoEntry}</td></tr>`);
                    warehouseCargo += parseInt(cargoEntry);
                    $("#td5").text(`Total Cargo Weight: ${warehouseCargo}`);

                }
            }
        

            resetDivDForm();
        }
    })

});