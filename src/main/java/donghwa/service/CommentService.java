package donghwa.service;

import java.util.List;

import donghwa.domain.Board;
import donghwa.domain.Comment;

public interface CommentService {
  void comAdd(Comment comment) throws Exception;
  List<Comment> comList(int pageNo, int pageSize, int bwnoNo) throws Exception;
  int comGetSize(int bwnoNo) throws Exception;
  void comRemove(int no) throws Exception;
}







