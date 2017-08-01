package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;

public interface BoardDao {
  List<Board> selectList(Map<String,Object> valueMap);
  List<Board> comSelectList(Map<String,Object> valueMap);
  List<Board> selectListByTitle(Map<String,String> valueMap);
  int insert(Board board);
  int commentInsert(Board board);
  int countAll();
  int suchCountAll(Map<String, String> keyword);
  Board selectOne(int no);
  int delete(int no);
  int update(Board board);
}
