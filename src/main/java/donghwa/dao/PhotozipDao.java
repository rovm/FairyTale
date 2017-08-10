package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Photozip;

public interface PhotozipDao {
  int insert(Photozip photozip);
  int insert2(Photozip photozip);
  int countAll(int mno);
  List<Photozip> selectList(Map<String,Object> valueMap);
  int delete(int no);
  int delete2(int no);
}
