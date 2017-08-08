package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;

public interface MywriteDao {
  List<Board> selectList(Map<String,Object> valueMap);
  List<Board> selectListByTitle(Map<String,String> valueMap);
  int countAll(int memberNo);
  int suchCountAll(Map<String, String> keyword);
}
