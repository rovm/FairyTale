package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.CommentDao;
import donghwa.domain.Board;
import donghwa.domain.Comment;
import donghwa.service.CommentService;


@Service
public class CommentServiceImpl implements CommentService {
  @Autowired
  CommentDao commentDao;
  
  public void comAdd(Comment comment) throws Exception {
	  commentDao.commentInsert(comment);
	  }
  
  public List<Comment> comList(int pageNo, int pageSize, int bwnoNo) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    valueMap.put("bwnoNo", bwnoNo);
	    return commentDao.comSelectList(valueMap);
	  }
  

  
  @Override
  public int comGetSize(int bwnoNo) throws Exception {
    return commentDao.comCountAll(bwnoNo);
  }
  
  
  public void comRemove(int no) throws Exception {
	    int count = commentDao.comDelete(no);
	    if (count < 1) {
	      throw new Exception(no + "번 테이블을 찾을 수 없습니다.");
	    }
	    
	    try {
	      count = commentDao.comDelete(no);
	    } catch (Exception e) {}
	}

}







