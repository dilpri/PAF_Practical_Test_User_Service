<%@ page import="com.Doctor"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Doctors Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.5.0.min.js"></script>
<script src="Components/Doctor.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-8">
				<h1>Doctors Management</h1>
				<form id="formDoctor" name="formDoctor" method="post" action="doctors.jsp">
					Doctor Name : <input id="doctorName" name="doctorName" type="text"
						class="form-control form-control-sm"><br> NIC :
					<input id="NIC" name="NIC" type="text"
						class="form-control form-control-sm"><br> Specialization : <input
						id="specialization" name="specialization" type="text"
						class="form-control form-control-sm"><br> Hospital : <input
						id="hospital" name="hospital" type="text"
						class="form-control form-control-sm"><br> Email :
					<input id="email" name="email" type="text"
						class="form-control form-control-sm"><br> Mobile No : <input
						id="mobileNo" name="mobileNo" type="text"
						class="form-control form-control-sm"><br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidDoctorIDSave" name="hidDoctorIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divDoctorsGrid">
					<%
						Doctor doctorObj = new Doctor();
						out.print(doctorObj.readDoctors());
					%>
				</div>
			</div>
		</div>
	</div>
</body>
</html>