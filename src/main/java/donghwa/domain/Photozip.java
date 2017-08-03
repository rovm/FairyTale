package donghwa.domain;

public class Photozip extends Board {
  int bwno;
  String filePath;
  String fileName;
  
  @Override
  public String toString() {
    return "Photozip [bwno=" + bwno + ", filePath=" + filePath + ", fileName=" + fileName + "]";
  }
  public int getBwno() {
    return bwno;
  }
  public void setBwno(int bwno) {
    this.bwno = bwno;
  }
  public String getFilePath() {
    return filePath;
  }
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  public String getFileName() {
    return fileName;
  }
  public void setFileName(String fileName) {
    this.fileName = fileName;
  }


  
  
}