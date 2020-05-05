$(document).ready(function () {
	$("#alertSuccess").hide(); 
	$("#alertError").hide();
	
});
// SAVE ============================================
$(document).on("click", "#btnSave", function (event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateDoctorForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidDoctorIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "DoctorsAPI",
		type : type,
		data : $("#formDoctor").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onDoctorSaveComplete(response.responseText, status);
		}
	});
});

function onDoctorSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divDoctorsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidDoctorIDSave").val("");
	$("#formDoctor")[0].reset();
}
//DELETE
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "DoctorsAPI",
		type : "DELETE",
		data : "doctorID=" + $(this).data("doctorid"),
		dataType : "text",
		complete : function(response, status) {
			onDoctorDeleteComplete(response.responseText, status);
		}
	});
});


//DELETE==========================================
function onDoctorDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divDoctorsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidDoctorIDSave").val(
					$(this).closest("tr").find('#hidDoctorIDUpdate').val());
			$("#doctorName").val($(this).closest("tr").find('td:eq(0)').text());
			$("#NIC").val($(this).closest("tr").find('td:eq(1)').text());
			$("#specialization").val($(this).closest("tr").find('td:eq(2)').text());
			$("#hospital").val($(this).closest("tr").find('td:eq(3)').text());
			$("#email").val($(this).closest("tr").find('td:eq(4)').text());
			$("#mobileNo").val($(this).closest("tr").find('td:eq(5)').text());
		});


// CLIENTMODEL=========================================================================
function validateDoctorForm() {
	// name
	if ($("#doctorName").val().trim() == "") {
		return "Insert Doctor Name.";
	}
	// NIC
	if ($("#NIC").val().trim() == "") {
		return "Insert NIC.";
	}
	
	// spec-------------------------------
	if ($("#specialization").val().trim() == "") {
		return "Insert Specialization.";
	}
	/*// is numerical value
	var tmpPrice = $("#itemPrice").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for Item Price.";
	}
	// convert to decimal price
	$("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));*/

	// hospital------------------------
	if ($("#hospital").val().trim() == "") {
		return "Insert Hospital.";
	}
		// email
	if ($("#email").val().trim() == "") {
		return "Insert Email.";
	}
	
	// mobile-------------------------------
	if ($("#mobileNo").val().trim() == "") {
		return "Insert Mobile Number.";
	}
	
	return true;
}