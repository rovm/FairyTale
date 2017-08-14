package donghwa.domain;

public class CustPage{
  int mno;
  int bkno;
  String Cust_IMG;
  String Cust_REC;

  @Override
public String toString() {
	return "CustPage [mno=" + mno + ", bkno=" + bkno + ", Cust_IMG=" + Cust_IMG + ", Cust_REC=" + Cust_REC + "]";
}
  
public int getMno() {
	return mno;
}
public void setMno(int mno) {
	this.mno = mno;
}
public int getBkno() {
	return bkno;
}
public void setBkno(int bkno) {
	this.bkno = bkno;
}
public String getCust_IMG() {
	return Cust_IMG;
}
public void setCust_IMG(String cust_IMG) {
	Cust_IMG = cust_IMG;
}
public String getCust_REC() {
	return Cust_REC;
}
public void setCust_REC(String cust_REC) {
	Cust_REC = cust_REC;
}
  
  
}
