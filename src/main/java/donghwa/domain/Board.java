package donghwa.domain;

public class Board {
	int no;
	int mno;
	String name;
	String bw_name;
	String bw_con;
	String bw_wdt;
	String bw_edt;
	String bw_hits;
	@Override
	public String toString() {
		return "Board [no=" + no + ", mno=" + mno + ", name=" + name + ", bw_name=" + bw_name + ", bw_con=" + bw_con
				+ ", bw_wdt=" + bw_wdt + ", bw_edt=" + bw_edt + ", bw_hits=" + bw_hits + "]";
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public int getMno() {
		return mno;
	}
	public void setMno(int mno) {
		this.mno = mno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBw_name() {
		return bw_name;
	}
	public void setBw_name(String bw_name) {
		this.bw_name = bw_name;
	}
	public String getBw_con() {
		return bw_con;
	}
	public void setBw_con(String bw_con) {
		this.bw_con = bw_con;
	}
	public String getBw_wdt() {
		return bw_wdt;
	}
	public void setBw_wdt(String bw_wdt) {
		this.bw_wdt = bw_wdt;
	}
	public String getBw_edt() {
		return bw_edt;
	}
	public void setBw_edt(String bw_edt) {
		this.bw_edt = bw_edt;
	}
	public String getBw_hits() {
		return bw_hits;
	}
	public void setBw_hits(String bw_hits) {
		this.bw_hits = bw_hits;
	}
	
	

}
	