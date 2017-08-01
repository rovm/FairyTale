package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BoardDao;
import donghwa.domain.Board;
import donghwa.domain.Teacher;
import donghwa.service.BoardService;


@Service
public class BoardServiceImpl implements BoardService {
  @Autowired
  BoardDao boardDao;
  
  public void add(Board board) throws Exception {
    boardDao.insert(board);
  }
  
  public void comAdd(Board board) throws Exception {
	    boardDao.commentInsert(board);
	  }
  
  public List<Board> list(int pageNo, int pageSize) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    
	    return boardDao.selectList(valueMap);
	  }
  
  public List<Board> comList(int pageNo, int pageSize) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    
	    return boardDao.comSelectList(valueMap);
	  }
  

  
  @Override
  public int getSize() throws Exception {
    return boardDao.countAll();
  }
  
  @Override
  public int comGetSize() throws Exception {
    return boardDao.countAll();
  }
  
  public Board get(int no) throws Exception {
	return boardDao.selectOne(no);
  }
  public void remove(int no) throws Exception {
	    int count = boardDao.delete(no);
	    if (count < 1) {
	      throw new Exception(no + "번 테이블을 찾을 수 없습니다.");
	    }
	    
	    try {
	      count = boardDao.delete(no);
	    } catch (Exception e) {}
	  }
  
  public void update(Board board) throws Exception {
	    int count = boardDao.update(board);
	    if (count < 1) {
	      throw new Exception(board.getNo() + "번 강사를 찾을 수 없습니다.");
	    }
	    
	    count = boardDao.update(board);
	    if (count < 1) {
	      throw new Exception(board.getNo() + "번 강사를 찾을 수 없습니다.");
	    }
	    
	  }
}






