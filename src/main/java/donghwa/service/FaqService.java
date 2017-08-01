package donghwa.service;

import java.util.List;

import donghwa.domain.Faq;

public interface FaqService {
  List<Faq> list(int pageNo, int pageSize, String selectBtn) throws Exception;
  int getSize() throws Exception;

}







