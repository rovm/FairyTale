package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Faq;

public interface FaqDao {
  List<Faq> selectList(Map<String,Object> valueMap);
  int countAll();

}
