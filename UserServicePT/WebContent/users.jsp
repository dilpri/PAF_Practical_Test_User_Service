<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="javax.servlet.*"%>
<%@ page import="javax.servlet.http.*"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.User"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Users Management</title>
</head>
<body>
<div class="container">
		<div class="row">
			<div class="col-8">
				<h1>Users Management</h1>
				<form id="formUser" name="formUser" method="post" action="users.jsp">
					User name : <input id="username" name="username" type="text"
						class="form-control form-control-sm"><br> Password :
					<input id="password" name="password" type="text"
						class="form-control form-control-sm"><br> Email : <input
						id="email" name="email" type="text"
						class="form-control form-control-sm"><br> Address : <input
						id="address" name="address" type="text"
						class="form-control form-control-sm"><br> Phone No :
					<input id="phoneNo" name="phoneNo" type="text"
						class="form-control form-control-sm"><br> Age : <input
						id="age" name="age" type="text"
						class="form-control form-control-sm"><br> Sex : <input
						id="sex" name="sex" type="text"
						class="form-control form-control-sm"><br>User Type : <input
						id="userType" name="userType" type="text"
						class="form-control form-control-sm"><br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidUserIDSave" name="hidUserIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
					<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divUsersGrid">
					<%
						User userObj = new User();
					out.print(userObj.readUsers());
					%>
				</div>
				
</body>
</html>