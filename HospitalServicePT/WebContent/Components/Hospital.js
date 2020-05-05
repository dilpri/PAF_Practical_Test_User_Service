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
	var status = validateHospitalForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidHospitalIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "HospitalsAPI",
		type : type,
		data : $("#formHospital").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onHospitalSaveComplete(response.responseText, status);
		}
	});
});

function onHospitalSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divHospitalsGrid").html(resultSet.data);
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
	$("#hidHospitalIDSave").val("");
	$("#formHospital")[0].reset();
}
//DELETE
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "HospitalsAPI",
		type : "DELETE",
		data : "hospitalID=" + $(this).data("userid"),
		dataType : "text",
		complete : function(response, status) {
			onHospitalDeleteComplete(response.responseText, status);
		}
	});
});


//DELETE==========================================
function onHospitalDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divHospitalsGrid").html(resultSet.data);
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
			$("#hidHospitalIDSave").val(
					$(this).closest("tr").find('#hidHospitalIDUpdate').val());
			$("#hosName").val($(this).closest("tr").find('td:eq(0)').text());
			$("#location").val($(this).closest("tr").find('td:eq(1)').text());
			$("#email").val($(this).closest("tr").find('td:eq(2)').text());
			
		});


// CLIENTMODEL=========================================================================
function validateUserForm() {
	// name
	if ($("#hosName").val().trim() == "") {
		return "Insert Hospital Name.";
	}
	// password
	if ($("#location").val().trim() == "") {
		return "Insert Location.";
	}
	
	// email-------------------------------
	if ($("#email").val().trim() == "") {
		return "Insert Email.";
	}
	
	return true;
}