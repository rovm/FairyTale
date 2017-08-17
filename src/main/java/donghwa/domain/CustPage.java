package donghwa.domain;

public class CustPage{
  int ctno;
  int bkno;
  String Cust_IMG;
  String Cust_REC;
  
  int MBKno;
  int BK_Page;
  String BK_cont;
  String BK_IMG;
  String BK_REC;
  
  int mno;
  String Ct_Dscp;
  String Ct_Date;
  String Ct_public;
  
  String MBK_Titl;
  String MBK_Cont;
  @Override
  public String toString() {
    return "CustPage [ctno=" + ctno + ", bkno=" + bkno + ", Cust_IMG=" + Cust_IMG + ", Cust_REC=" + Cust_REC
        + ", MBKno=" + MBKno + ", BK_Page=" + BK_Page + ", BK_cont=" + BK_cont + ", BK_IMG=" + BK_IMG + ", BK_REC="
        + BK_REC + ", mno=" + mno + ", Ct_Dscp=" + Ct_Dscp + ", Ct_Date=" + Ct_Date + ", Ct_public=" + Ct_public
        + ", MBK_Titl=" + MBK_Titl + ", MBK_Cont=" + MBK_Cont + "]";
  }
  public int getCtno() {
    return ctno;
  }
  public void setCtno(int ctno) {
    this.ctno = ctno;
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
  public int getMBKno() {
    return MBKno;
  }
  public void setMBKno(int mBKno) {
    MBKno = mBKno;
  }
  public int getBK_Page() {
    return BK_Page;
  }
  public void setBK_Page(int bK_Page) {
    BK_Page = bK_Page;
  }
  public String getBK_cont() {
    return BK_cont;
  }
  public void setBK_cont(String bK_cont) {
    BK_cont = bK_cont;
  }
  public String getBK_IMG() {
    return BK_IMG;
  }
  public void setBK_IMG(String bK_IMG) {
    BK_IMG = bK_IMG;
  }
  public String getBK_REC() {
    return BK_REC;
  }
  public void setBK_REC(String bK_REC) {
    BK_REC = bK_REC;
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
  public String getMBK_Titl() {
    return MBK_Titl;
  }
  public void setMBK_Titl(String mBK_Titl) {
    MBK_Titl = mBK_Titl;
  }
  public String getMBK_Cont() {
    return MBK_Cont;
  }
  public void setMBK_Cont(String mBK_Cont) {
    MBK_Cont = mBK_Cont;
  }

  
  
}
