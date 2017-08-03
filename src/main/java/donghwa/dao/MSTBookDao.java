package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.MSTBook;

public interface MSTBookDao {
  List<MSTBook> selectList(Map<String,Object> valueMap);
  int countAll(String selectform);
  List<MSTBook> selectOne(int no);
}
