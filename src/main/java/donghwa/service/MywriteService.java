package donghwa.service;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;

public interface MywriteService {
  List<Board> myList(int pageNo, int pageSize, int memberNo) throws Exception;
  List<Board> mySuchList(Map<String, String> keyword) throws Exception;
  int getSize(int memberNo) throws Exception;
  int suchGetSize(Map<String, String> keyword) throws Exception;
}







