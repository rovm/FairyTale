package donghwa.domain;

public class Together extends CustPage {
  String name;
  String rmnd;

@Override
public String toString() {
	return "Together [name=" + name + ", rmnd=" + rmnd + "]";
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
