package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Together;

public interface BestDao {
  List<Together> selectList(Map<String,Object> valueMap);
}
