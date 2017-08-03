package donghwa.service;

import java.util.List;

import donghwa.domain.MSTBook;

public interface MSTBookService {
  List<MSTBook> list(int pageNo, int pageSize, String selectform) throws Exception;
  int getSize(String selectform) throws Exception;
  List<MSTBook> get(int no) throws Exception;
}







