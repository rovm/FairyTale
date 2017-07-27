package donghwa.service;

<<<<<<< HEAD
import donghwa.domain.Board;

public interface BoardService {
  void add(Board board) throws Exception;
	
=======
import java.util.List;

import donghwa.domain.Board;
import donghwa.domain.Teacher;

public interface BoardService {
  void add(Board board) throws Exception;
  List<Board> list(int pageNo, int pageSize) throws Exception;
  int getSize() throws Exception;
  Board get(int no) throws Exception;
  void remove(int no) throws Exception;
  void update(Board board) throws Exception;
>>>>>>> origin/master
}







