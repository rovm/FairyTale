package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.MSTBook;
import donghwa.domain.Teacher;

public interface MSTBookDao {
  List<MSTBook> selectList(Map<String,Object> valueMap);
  int countAll();
  MSTBook selectOne(int no);
}
