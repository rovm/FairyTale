package donghwa.domain;

public class Fileupload extends Board{
	
	String filePath;
	String fileName;
	@Override
	public String toString() {
		return "Fileupload [filePath=" + filePath + ", fileName=" + fileName + "]";
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