package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.NoticeDao;
import donghwa.domain.Board;
import donghwa.service.NoticeService;


@Service
public class NoticeServiceImpl implements NoticeService {
  @Autowired
  NoticeDao noticeDao;
  
  
  
  
  public List<Board> noticeList(int pageNo, int pageSize) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("startIndex", (pageNo - 1) * pageSize);
	    valueMap.put("pageSize", pageSize);
	    
	    return noticeDao.noticeSelectList(valueMap);
	  }
  
  
  @Override
  public List<Board> noticeSuchList(Map<String, String> keyword) throws Exception {
	    return noticeDao.noticeSelectListByTitle(keyword);
  }
  

  
  @Override
  public int noticeGetSize() throws Exception {
    return noticeDao.countAll();
  }
  
  
  @Override
  public int noticeSuchGetSize(Map<String, String> keyword) throws Exception {
  	return noticeDao.suchCountAll(keyword);
  }
  


}







