package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;
import donghwa.domain.Teacher;

public interface BoardDao {
  List<Board> selectList(Map<String,Object> valueMap);
  List<Board>comSelectList(Map<String,Object> valueMap);
  int insert(Board board);
  int commentInsert(Board board);
  int countAll();
  Board selectOne(int no);
  int delete(int no);
  int update(Board board);
}
