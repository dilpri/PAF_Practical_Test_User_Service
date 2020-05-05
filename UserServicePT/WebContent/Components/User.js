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
	var status = validateUserForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidUserIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "UsersAPI",
		type : type,
		data : $("#formUser").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onUserSaveComplete(response.responseText, status);
		}
	});
});

function onUserSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divUsersGrid").html(resultSet.data);
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
	$("#hidUserIDSave").val("");
	$("#formUser")[0].reset();
}
//DELETE
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "UsersAPI",
		type : "DELETE",
		data : "userID=" + $(this).data("userid"),
		dataType : "text",
		complete : function(response, status) {
			onUserDeleteComplete(response.responseText, status);
		}
	});
});


//DELETE==========================================
function onUserDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divUsersGrid").html(resultSet.data);
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
			$("#hidUserIDSave").val(
					$(this).closest("tr").find('#hidUserIDUpdate').val());
			$("#username").val($(this).closest("tr").find('td:eq(0)').text());
			$("#password").val($(this).closest("tr").find('td:eq(1)').text());
			$("#email").val($(this).closest("tr").find('td:eq(2)').text());
			$("#address").val($(this).closest("tr").find('td:eq(3)').text());
			$("#phoneNo").val($(this).closest("tr").find('td:eq(4)').text());
			$("#age").val($(this).closest("tr").find('td:eq(5)').text());
			$("#sex").val($(this).closest("tr").find('td:eq(6)').text());
			$("#userType").val($(this).closest("tr").find('td:eq(7)').text());
		});


// CLIENTMODEL=========================================================================
function validateUserForm() {
	// name
	if ($("#username").val().trim() == "") {
		return "Insert Username.";
	}
	// password
	if ($("#password").val().trim() == "") {
		return "Insert Password.";
	}
	
	// email-------------------------------
	if ($("#email").val().trim() == "") {
		return "Insert Email.";
	}
	/*// is numerical value
	var tmpPrice = $("#itemPrice").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for Item Price.";
	}
	// convert to decimal price
	$("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));*/
	// address------------------------
	if ($("#address").val().trim() == "") {
		return "Insert Address.";
	}
		// phone
	if ($("#phoneNo").val().trim() == "") {
		return "Insert Phone Number.";
	}
	
	// age-------------------------------
	if ($("#age").val().trim() == "") {
		return "Insert Age.";
	}
	//is numerical value
	var tmpAge = $("#age").val().trim();
	if (!$.isNumeric(tmpAge)) {
		return "Insert a numerical value for Age.";
	}
	//sex
	if ($("#sex").val().trim() == "") {
		return "Insert Gender.";
	}
	//user type
	if ($("#userType").val().trim() == "") {
		return "Insert User Type.";
	}

	return true;
}