package donghwa.domain;

public class Custbook{
  int no;
  int mno;
  int mbkno;
  String Ct_dscp;
  String Ct_date;
  String Ct_public;






@Override
public String toString() {
	return "Custbook [no=" + no + ", mno=" + mno + ", mbkno=" + mbkno + ", Ct_dscp=" + Ct_dscp + ", Ct_date=" + Ct_date
			+ ", Ct_public=" + Ct_public + "]";
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
public int getMbkno() {
	return mbkno;
}
public void setMbkno(int mbkno) {
	this.mbkno = mbkno;
}
public String getCt_dscp() {
	return Ct_dscp;
}
public void setCt_dscp(String ct_dscp) {
	Ct_dscp = ct_dscp;
}
public String getCt_date() {
	return Ct_date;
}
public void setCt_date(String ct_date) {
	Ct_date = ct_date;
}
public String getCt_public() {
	return Ct_public;
}
public void setCt_public(String ct_public) {
	Ct_public = ct_public;
}








}
