package donghwa.service;

import java.util.List;

import donghwa.domain.MSTBook;
import donghwa.domain.Teacher;

public interface MSTBookService {
  List<MSTBook> list(int pageNo, int pageSize, String selectform) throws Exception;
  int getSize() throws Exception;
  MSTBook get(int no) throws Exception;
}







