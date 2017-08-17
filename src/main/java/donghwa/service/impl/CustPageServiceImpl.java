package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.CustPageDao;
import donghwa.domain.BKPage;
import donghwa.domain.CustPage;
import donghwa.domain.MSTBook;
import donghwa.service.CustPageService;


@Service
public class CustPageServiceImpl implements CustPageService {
  @Autowired CustPageDao custPageDao;
  
  public List<CustPage> list(int pageNo, int pageSize, int mno) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("startIndex", (pageNo - 1) * pageSize);
    valueMap.put("pageSize", pageSize);
    valueMap.put("mno", mno);
    
    return custPageDao.selectList(valueMap);
  }
  
  public int getSize(int mno) throws Exception {
    return custPageDao.countAll(mno);
  }
  
  public List<CustPage> get(int ctno) throws Exception {
    return custPageDao.selectOne(ctno);
  }
}







