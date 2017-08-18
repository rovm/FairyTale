package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.TogetherDao;
import donghwa.domain.Together;
import donghwa.service.TogetherService;


@Service
public class TogetherServiceImpl implements TogetherService {
  @Autowired TogetherDao togetherDao;
  
  public List<Together> list(int pageNo, int pageSize, int mno) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("startIndex", (pageNo - 1) * pageSize);
    valueMap.put("pageSize", pageSize);
    valueMap.put("mno", mno);
    
    return togetherDao.selectList(valueMap);
  }
  
  public int getSize(int mno) throws Exception {
    return togetherDao.countAll(mno);
  }
  
  public List<Together> get(int ctno) throws Exception {
    return togetherDao.selectOne(ctno);
  }
  
  public void addLike(Together together) throws Exception {
	 togetherDao.likeInsert(together);
  }
  
  public List<Together> getMno(int mno) throws Exception {
	return togetherDao.likeConfirm(mno);
  }
  
  public void delLike(Together together) throws Exception {
	    int count = togetherDao.likeDelete(together);
	    if (count < 1) {
//	      throw new Exception(mno + "번 테이블을 찾을 수 없습니다.");
	    }
	    
	    try {
	      count = togetherDao.likeDelete(together);
	    } catch (Exception e) {}
	  }
}







