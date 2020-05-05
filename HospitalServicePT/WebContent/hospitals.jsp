<%@ page import="com.Hospital"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Hospitals Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.5.0.min.js"></script>
<script src="Components/Hospital.js"></script>
</head>
<body>
<div class="container">
		<div class="row">
			<div class="col-8">
				<h1>Hospitals Management</h1>
				<form id="formHospital" name="formHospital" method="post" action="hospitals.jsp">
					Hospital Name : <input id="hosName" name="hosName" type="text"
						class="form-control form-control-sm"><br> Location :
					<input id="location" name="location" type="text"
						class="form-control form-control-sm"><br> Email : <input
						id="email" name="email" type="text"
						class="form-control form-control-sm"><br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidHospitalIDSave" name="hidHospitalIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divHospitalsGrid">
					<%
						Hospital hospitalObj = new Hospital();
						out.print(hospitalObj.readHospitals());
					%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>