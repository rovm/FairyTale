package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.Comment;

public interface CommentDao {
  List<Comment> comSelectList(Map<String,Object> valueMap);
  int commentInsert(Comment comment);
  int comCountAll(int bwnoNo);
  int comDelete(int no);
}
