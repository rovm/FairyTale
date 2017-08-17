package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.CustPage;
import donghwa.domain.MSTBook;

public interface CustPageDao {
  int countAll(int mno);
  List<CustPage> selectList(Map<String,Object> valueMap);
  List<CustPage> selectOne(int ctno);
}
