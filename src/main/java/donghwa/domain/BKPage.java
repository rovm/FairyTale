package donghwa.domain;

public class BKPage{
  int bkno;
  int mbkno;
  int BK_Page;
  String BK_cont;
  String BK_IMG;
  String BK_REC;



@Override
public String toString() {
	return "BKPage [bkno=" + bkno + ", mbkno=" + mbkno + ", BK_Page=" + BK_Page + ", BK_cont=" + BK_cont + ", BK_IMG="
			+ BK_IMG + ", BK_REC=" + BK_REC + "]";
}



public int getBkno() {
	return bkno;
}
public void setBkno(int bkno) {
	this.bkno = bkno;
}
public int getMbkno() {
	return mbkno;
}
public void setMbkno(int mbkno) {
	this.mbkno = mbkno;
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





}
