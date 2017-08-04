package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BoardDao;
import donghwa.domain.Board;
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
  
  public void conAdd(Board board) throws Exception {
	    boardDao.contextInsert(board);
	  }
  
  public List<Board> list(int pageNo, int pageSize) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    
	    return boardDao.selectList(valueMap);
	  }
  
  public List<Board> comList(int pageNo, int pageSize, int bwnoNo) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    valueMap.put("bwnoNo", bwnoNo);
	    return boardDao.comSelectList(valueMap);
	  }
  
  @Override
  public List<Board> suchList(Map<String, String> keyword) throws Exception {
	    return boardDao.selectListByTitle(keyword);
  }
  

  
  @Override
  public int getSize() throws Exception {
    return boardDao.countAll();
  }
  
  @Override
  public int comGetSize(int bwnoNo) throws Exception {
    return boardDao.comCountAll(bwnoNo);
  }
  
  @Override
  public int suchGetSize(Map<String, String> keyword) throws Exception {
  	return boardDao.suchCountAll(keyword);
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
  
  public void comRemove(int no) throws Exception {
	    int count = boardDao.comDelete(no);
	    if (count < 1) {
	      throw new Exception(no + "번 테이블을 찾을 수 없습니다.");
	    }
	    
	    try {
	      count = boardDao.comDelete(no);
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







