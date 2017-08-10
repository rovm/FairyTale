package donghwa.domain;

public class CustPage extends BKPage{
  int no;
  String MBK_titl;
  String MBK_cont;
  String MBK_page;
  String MBK_div;
  
  @Override
  public String toString() {
    return "MSTBook [no=" + no + ", MBK_titl=" + MBK_titl + ", MBK_cont=" + MBK_cont + ", MBK_page=" + MBK_page
        + ", MBK_div=" + MBK_div + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getMBK_titl() {
    return MBK_titl;
  }
  public void setMBK_titl(String mBK_titl) {
    MBK_titl = mBK_titl;
  }
  public String getMBK_cont() {
    return MBK_cont;
  }
  public void setMBK_cont(String mBK_cont) {
    MBK_cont = mBK_cont;
  }
  public String getMBK_page() {
    return MBK_page;
  }
  public void setMBK_page(String mBK_page) {
    MBK_page = mBK_page;
  }
  public String getMBK_div() {
    return MBK_div;
  }
  public void setMBK_div(String mBK_div) {
    MBK_div = mBK_div;
  }
  
  
}
