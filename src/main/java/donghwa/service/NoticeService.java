package donghwa.service;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;

public interface NoticeService {
  List<Board> noticeList(int pageNo, int pageSize) throws Exception;
  List<Board> suchList(Map<String, String> keyword) throws Exception;
  int noticeGetSize() throws Exception;
  int suchGetSize(Map<String, String> keyword) throws Exception;
}







