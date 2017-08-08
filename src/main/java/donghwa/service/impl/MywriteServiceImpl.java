package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.MywriteDao;
import donghwa.domain.Board;
import donghwa.service.MywriteService;


@Service
public class MywriteServiceImpl implements MywriteService {
  @Autowired
  MywriteDao mywriteDao;
  
  public List<Board> myList(int pageNo, int pageSize, int memberNo) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    valueMap.put("memberNo", memberNo);
	    
	    return mywriteDao.selectList(valueMap);
	  }
  
  @Override
  public List<Board> mySuchList(Map<String, String> keyword) throws Exception {
	    return mywriteDao.selectListByTitle(keyword);
  }
  

  
  @Override
  public int getSize(int memberNo) throws Exception {
    return mywriteDao.countAll(memberNo);
  }
  
  @Override
  public int suchGetSize(Map<String, String> keyword) throws Exception {
  	return mywriteDao.suchCountAll(keyword);
  }
  
}







