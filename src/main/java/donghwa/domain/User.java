package donghwa.domain;

public class User {
	int no;
	String email;
	String password;
	String phone;


	@Override
	public String toString() {
		return "User [no=" + no + ", email=" + email + ", password=" + password + ", phone=" + phone + "]";
	}
	public int getJno() {
		return no;
	}
	public void setJno(int no) {
		this.no = no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}


}
