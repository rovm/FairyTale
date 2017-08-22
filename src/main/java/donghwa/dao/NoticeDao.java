package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Board;

public interface NoticeDao {
  List<Board> noticeSelectList(Map<String,Object> valueMap);
  List<Board> noticeSelectListByTitle(Map<String,String> valueMap);
  int countAll();
  int suchCountAll(Map<String, String> keyword);
}
