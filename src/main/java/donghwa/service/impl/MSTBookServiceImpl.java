package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.MSTBookDao;
import donghwa.domain.MSTBook;
import donghwa.domain.Teacher;
import donghwa.service.MSTBookService;

@Service
public class MSTBookServiceImpl implements MSTBookService {
  @Autowired
  MSTBookDao mstBookDao;
  
  public List<MSTBook> list(int pageNo, int pageSize, String selectform) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("startIndex", (pageNo - 1) * pageSize);
    valueMap.put("pageSize", pageSize);
    valueMap.put("selectform", selectform);
    
    return mstBookDao.selectList(valueMap);
  }
  
  @Override
  public int getSize() throws Exception {
    return mstBookDao.countAll();
  }
  
  public MSTBook get(int no) throws Exception {
    return mstBookDao.selectOne(no);
  }
}







