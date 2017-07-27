package donghwa.dao;

<<<<<<< HEAD
import donghwa.domain.Board;

public interface BoardDao {
  int insert(Board board);
=======
import java.util.List;
import java.util.Map;

import donghwa.domain.Board;
import donghwa.domain.Teacher;

public interface BoardDao {
  List<Board> selectList(Map<String,Object> valueMap);
  int insert(Board board);
  int countAll();
  Board selectOne(int no);
  int delete(int no);
  int update(Board board);
>>>>>>> origin/master
}
