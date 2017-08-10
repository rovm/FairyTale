package donghwa.domain;

public class Comment extends Board{
	String c_con;
	String c_wdt;
	
	@Override
	public String toString() {
		return "Comment [c_con=" + c_con + ", c_wdt=" + c_wdt + "]";
	}
	public String getC_con() {
		return c_con;
	}
	public void setC_con(String c_con) {
		this.c_con = c_con;
	}
	public String getC_wdt() {
		return c_wdt;
	}
	public void setC_wdt(String c_wdt) {
		this.c_wdt = c_wdt;
	}

	
}