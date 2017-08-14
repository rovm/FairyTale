package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.CustPageDao;
import donghwa.domain.CustPage;
import donghwa.service.CustPageService;


@Service
public class CustPageServiceImpl implements CustPageService {

  @Autowired CustPageDao custPageDao;
  
  
  public void add(CustPage custPage) throws Exception {
	  custPageDao.insert(custPage);
  }
  
}







