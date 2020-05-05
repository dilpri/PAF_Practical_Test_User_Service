package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.http.HttpServlet;

public class Doctor extends HttpServlet {
	private Connection connect() {
		Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			// Provide the correct details: DBServer/DBName, username, password
			con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/doctor", "root", "");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return con;
	}

	public String insertDoctor(String doctorName, String NIC, String specialization, String hospital, String email,
			String mobileNo) {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for inserting.";
			}
			// create a prepared statement
			String query = " insert into doctors (`doctorID`,`doctorName`,`NIC`,`specialization`,`hospital`,`email`,`mobileNo`)"
					+ " values (?, ?, ?, ?, ?,?,?)";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, doctorName);
			preparedStmt.setString(3, NIC);
			preparedStmt.setString(4, specialization);
			preparedStmt.setString(5, hospital);
			preparedStmt.setString(6, email);
			preparedStmt.setString(7, mobileNo);

			// execute the statement
			preparedStmt.execute();
			con.close();

			String newDoctors = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" + newDoctors + "\"}";

			// output = "Inserted successfully";
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while inserting the doctor.\"}";
			// output = "Error while inserting the doctor.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String readDoctors() {
		String output = "";

		try {
			Connection con = connect();

			if (con == null) {
				return "Error while connecting the database for reading";
			}

			output = "<table border='1'><tr><th>Doctor name</th><th>NIC</th><th>Specialization</th><th>Hospital Name</th><th>email</th><th>Mobile No</th></tr>";

			String query = "select * from doctors";
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);

			while (rs.next()) {
				String doctorID = Integer.toString(rs.getInt("doctorID"));
				String doctorName = rs.getString("doctorName");
				String NIC = rs.getString("NIC");
				String specialization = rs.getString("specialization");
				String hospital = rs.getString("hospital");
				String email = rs.getString("email");
				String mobileNo = rs.getString("mobileNo");

				// Add into the html table
				output += "<tr><td><input id='hidDoctorIDUpdate' name ='hidDoctorIDUpdate' type='hidden' value='"
						+ doctorID + "'>" + doctorName + "</td>";

				output += "<tr><td>" + doctorName + "</td>";
				output += "<td>" + NIC + "</td>";
				output += "<td>" + specialization + "</td>";
				output += "<td>" + hospital + "</td>";
				output += "<td>" + email + "</td>";
				output += "<td>" + mobileNo + "</td>";

				// buttons
				output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'></td><td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-doctorid='"
						+ doctorID + "'>" + "</td></tr>";

			}
			con.close();
			// Complete the html table
			output += "</table>";
		} catch (Exception e) {
			output = "Error while reading doctors";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String updateDoctor(String doctorID, String doctorName, String NIC, String specialization, String hospital,
			String email, String mobileNo) {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for updating.";
			}
			// create a prepared statement
			String query = "UPDATE doctors SET doctorName=?,NIC=?,specialization=?,hospital=?,email=?,mobileNo=?  WHERE doctorID=?";

			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setString(1, doctorName);
			preparedStmt.setString(2, NIC);
			preparedStmt.setString(3, specialization);
			preparedStmt.setString(4, hospital);
			preparedStmt.setString(5, email);
			preparedStmt.setString(6, mobileNo);
			preparedStmt.setInt(7, Integer.parseInt(doctorID));
			// execute the statement
			preparedStmt.execute();
			con.close();

			// output = "Updated successfully";
			String newDoctors = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" + newDoctors + "\"}";

			// output = "Updated successfully";
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while updating the doctor.\"}";
			// output = "Error while updating the doctor.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String deleteDoctor(String doctorID) {
		String output = "";
		try {
			Connection con = connect();
			if (con == null) {
				return "Error while connecting to the database for deleting.";
			}
			// create a prepared statement
			String query = "delete from doctors where doctorID=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(doctorID));
			// execute the statement
			preparedStmt.execute();
			con.close();

			// output = "Deleted successfully";
			String newDoctors = readDoctors();
			output = "{\"status\":\"success\", \"data\": \"" + newDoctors + "\"}";

			// output = "Deleted successfully";
		} catch (Exception e) {
			output = "{\"status\":\"error\", \"data\":\"Error while deleting the doctor.\"}";
			// output = "Error while deleting the doctor.";
			System.err.println(e.getMessage());
		}
		return output;
	}
}
