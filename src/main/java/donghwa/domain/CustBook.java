package donghwa.domain;

public class CustBook{
  int mno;
  String Ct_Dscp;
  String Ct_Date;
  String Ct_public;
  
  @Override
  public String toString() {
    return "CustBook [mno=" + mno + ", Ct_Dscp=" + Ct_Dscp + ", Ct_Date=" + Ct_Date + ", Ct_public=" + Ct_public + "]";
  }
  
  public int getMno() {
    return mno;
  }
  public void setMno(int mno) {
    this.mno = mno;
  }
  public String getCt_Dscp() {
    return Ct_Dscp;
  }
  public void setCt_Dscp(String ct_Dscp) {
    Ct_Dscp = ct_Dscp;
  }
  public String getCt_Date() {
    return Ct_Date;
  }
  public void setCt_Date(String ct_Date) {
    Ct_Date = ct_Date;
  }
  public String getCt_public() {
    return Ct_public;
  }
  public void setCt_public(String ct_public) {
    Ct_public = ct_public;
  }
  
}
