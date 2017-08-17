package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.CustbookDao;
import donghwa.domain.Custbook;
import donghwa.service.CustbookService;


@Service
public class CustbookServiceImpl implements CustbookService {
  @Autowired
  CustbookDao custbookDao;
  
  
  public void addCustbook(Custbook custbook) throws Exception {
	  custbookDao.insert(custbook);
	  }
  
  
  public void updateCustbook(Custbook custbook) throws Exception {
	  custbookDao.update(custbook);
	  }
  
  
  
 

}







