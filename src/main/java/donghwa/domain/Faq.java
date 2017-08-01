package donghwa.domain;

public class Faq extends Board {
  String quest;
  String answer;
  
  
  


@Override
public String toString() {
	return "Faq [quest=" + quest + ", answer=" + answer + ", no=" + no + ", bw_name=" + bw_name + ", bw_con=" + bw_con
			+ ", bw_wdt=" + bw_wdt + ", bw_edt=" + bw_edt + ", bw_hits=" + bw_hits + ", mno=" + mno + "]";
}
public String getQuest() {
	return quest;
}
public void setQuest(String quest) {
	this.quest = quest;
}
public String getAnswer() {
	return answer;
}
public void setAnswer(String answer) {
	this.answer = answer;
}
  
  
  
}