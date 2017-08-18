package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Together;

public interface TogetherDao {
  int countAll(int mno);
  List<Together> selectList(Map<String,Object> valueMap);
  List<Together> selectOne(int ctno);
  List<Together> likeConfirm(int mno);
  int likeInsert(Together together);
  int likeDelete(Together together);
}
