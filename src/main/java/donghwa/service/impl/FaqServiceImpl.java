package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BoardDao;
import donghwa.dao.FaqDao;
import donghwa.domain.Faq;
import donghwa.service.FaqService;

@Service
public class FaqServiceImpl implements FaqService {
  @Autowired
  BoardDao boardDao;
  
  @Autowired
  FaqDao faqDao;
  
  public List<Faq> list(int pageNo, int pageSize, String selectBtn) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("startIndex", (pageNo - 1) * pageSize);
    valueMap.put("pageSize", pageSize);
    valueMap.put("selectBtn", selectBtn);
    
    return faqDao.selectList(valueMap);
  }
  
  @Override
  public int getSize() throws Exception {
    return faqDao.countAll();
  }
  

  
  
 }







