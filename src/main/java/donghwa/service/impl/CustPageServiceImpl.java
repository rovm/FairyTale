package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.CustPageDao;
import donghwa.domain.CustPage;
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
  
  public void add(CustPage custPage) throws Exception {
	  custPageDao.insert(custPage);
}
  
  public void update(CustPage custPage) throws Exception {
	  custPageDao.update(custPage);
	  }
  
  public void remove(int no) throws Exception {
    int count = custPageDao.delete(no);
        count = custPageDao.delete2(no);
    if (count < 1) {
      throw new Exception(no + "번 게시글을 찾을 수 없습니다.");
    }
  }

  @Override
  public String custpage_detail(int ctno, int bkno) throws Exception {
  	System.out.printf("서비스왔음",ctno, bkno);
  	HashMap<String,Object> valueMap = new HashMap<>();
  	valueMap.put("ctno", ctno);
  	valueMap.put("bkno", bkno);
  	
  	 return custPageDao.custpage_detail(valueMap);
  }

}





