package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BestDao;
import donghwa.domain.Together;
import donghwa.service.BestService;


@Service
public class BestServiceImpl implements BestService {
  @Autowired BestDao bestDao;
  
  public List<Together> list() throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    return bestDao.selectList(valueMap);
  }
  
}







