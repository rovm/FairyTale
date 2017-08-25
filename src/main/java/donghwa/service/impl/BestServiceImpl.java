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
  
  /*이 맵은 마이바티스에서 쓰는 맵, #{year} 이부분*/
  public List<Together> list(int year, int month) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("year", year);
    valueMap.put("month", month);
    return bestDao.selectList(valueMap);
  }
  
}







