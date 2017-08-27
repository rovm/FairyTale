package donghwa.domain;

public class Together extends CustPage {
  String name;
  String rmnd;
  int likeCount;

@Override
public String toString() {
	return "Together [name=" + name + ", rmnd=" + rmnd + ", likeCount=" + likeCount + "]";
}

public int getLikeCount() {
	return likeCount;
}

public void setLikeCount(int likeCount) {
	this.likeCount = likeCount;
}

public String getRmnd() {
	return rmnd;
}

public void setRmnd(String rmnd) {
	this.rmnd = rmnd;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

}
