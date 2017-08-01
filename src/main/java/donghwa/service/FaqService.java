package donghwa.service;

import java.util.List;
import java.util.Map;

import donghwa.domain.Faq;

public interface FaqService {
  List<Faq> list(int pageNo, int pageSize, Map<String, String> selectBtn) throws Exception;
  int getSize(Map<String, String> selectBtn) throws Exception;

}







