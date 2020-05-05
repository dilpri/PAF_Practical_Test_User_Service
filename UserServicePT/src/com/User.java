package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.http.HttpServlet;

public class User extends HttpServlet {
	private Connection connect() {
		Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			// Provide the correct details: DBServer/DBName, username, password
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/user", "root", "");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return con;
	}

	public String insertUser(String username, String password, String email, String address, String phoneNo, String age,
			String sex, String userType) {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for inserting.";
			}
			// create a prepared statement
			String query = " insert into users(`userID`,`username`,`password`,`email`,`address`,`phoneNo`,`age`,`sex`,`userType`)"
					+ " values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, username);
			preparedStmt.setString(3, password);
			preparedStmt.setString(4, email);
			preparedStmt.setString(5, address);
			preparedStmt.setString(6, phoneNo);
			preparedStmt.setString(7, age);
			preparedStmt.setString(8, sex);
			preparedStmt.setString(9, userType);
			// execute the statement
			preparedStmt.execute();
			con.close();

			String newUsers = readUsers();
			output = "{\"status\":\"success\", \"data\": \"" + newUsers + "\"}";

			// output = "Inserted successfully";
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while inserting the user.\"}";
			// output = "Error while inserting the user.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String readUsers() {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for reading.";
			}
			// Prepare the html table to be displayed
			output = "<table border='1'><tr><th>User name</th><th>Password</th><th>Email</th><th>Address</th><th>Phone No</th><th>Age</th><th>Sex</th><th>User Type</th><th>Update</th><th>Remove</th></tr>";
			String query = "select * from users";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			// iterate through the rows in the result set
			while (rs.next()) {
				String userID = Integer.toString(rs.getInt("userID"));
				String username = rs.getString("username");
				String password = rs.getString("password");
				String email = rs.getString("email");
				String address = rs.getString("address");
				String phoneNo = rs.getString("phoneNo");
				String age = rs.getString("age");
				String sex = rs.getString("sex");
				String userType = rs.getString("userType");
				// Add into the html table
				output += "<tr><td><input id='hidUserIDUpdate' name ='hidUserIDUpdate' type='hidden' value='" + userID
						+ "'>" + username + "</td>";

				output += "<td>" + password + "</td>";
				output += "<td>" + email + "</td>";
				output += "<td>" + address + "</td>";
				output += "<td>" + phoneNo + "</td>";
				output += "<td>" + age + "</td>";
				output += "<td>" + sex + "</td>";
				output += "<td>" + userType + "</td>";
				// buttons
				output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'></td><td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-userid='"
						+ userID + "'>" + "</td></tr>";

			}
			con.close();
			// Complete the html table
			output += "</table>";
		} catch (Exception e) {
			output = "Error while reading users";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String updateUser(String userID, String username, String password, String email, String address,
			String phoneNo, String age, String sex, String userType) {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for updating.";
			}
			// create a prepared statement
			String query = "UPDATE users SET username=?,password=?,email=?,address=?,phoneNo=?,age=?,sex=?,userType=? WHERE userID=?";

			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setString(1, username);
			preparedStmt.setString(2, password);
			preparedStmt.setString(3, email);
			preparedStmt.setString(4, address);
			preparedStmt.setString(5, phoneNo);
			preparedStmt.setString(6, age);
			preparedStmt.setString(7, sex);
			preparedStmt.setString(8, userType);
			preparedStmt.setInt(9, Integer.parseInt(userID));
			// execute the statement
			preparedStmt.execute();
			con.close();
			// output = "Updated successfully";
			String newUsers = readUsers();
			output = "{\"status\":\"success\", \"data\": \"" + newUsers + "\"}";

		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while updating the user.\"}";
			// output = "Error while updating the user.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String deleteUser(String userID) {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for deleting.";
			}
			// create a prepared statement
			String query = "delete from users where userID=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(userID));
			// execute the statement
			preparedStmt.execute();
			con.close();
			// output = "Deleted successfully";
			String newUsers = readUsers();
			output = "{\"status\":\"success\", \"data\": \"" + newUsers + "\"}";

		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while deleting the user.\"}";
			// output = "Error while deleting the user.";
			System.err.println(e.getMessage());
		}
		return output;
	}
}
