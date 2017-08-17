package donghwa.service;

import java.util.List;

import donghwa.domain.CustPage;
import donghwa.domain.MSTBook;


public interface CustPageService {
  List<CustPage> list(int pageNo, int pageSize, int mno) throws Exception;
  int getSize(int mno) throws Exception;
  List<CustPage> get(int ctno) throws Exception;
}







