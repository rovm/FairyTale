package donghwa.service;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;

public interface BoardService {
  void add(Board board) throws Exception;
  void comAdd(Board board) throws Exception;
  List<Board> list(int pageNo, int pageSize) throws Exception;
  List<Board> comList(int pageNo, int pageSize) throws Exception;
  List<Board> suchList(Map<String, String> keyword) throws Exception;
  int getSize() throws Exception;
  int comGetSize() throws Exception;
  int suchGetSize(Map<String, String> keyword) throws Exception;
  Board get(int no) throws Exception;
  void remove(int no) throws Exception;
  void update(Board board) throws Exception;
}







