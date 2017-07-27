package donghwa.domain;

public class Create {
	int bno;
	String titl;
	String content;
	String file;
	
	@Override
	public String toString() {
		return "Create [bno=" + bno + ", titl=" + titl + ", content=" + content + ", file=" + file + "]";
	}

	public int getBno() {
		return bno;
	}

	public void setBno(int bno) {
		this.bno = bno;
	}

	public String getTitl() {
		return titl;
	}

	public void setTitl(String titl) {
		this.titl = titl;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}


}
