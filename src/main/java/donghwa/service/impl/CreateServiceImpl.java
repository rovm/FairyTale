package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.CreateDao;
import donghwa.domain.Create;
import donghwa.service.CreateService;


@Service
public class CreateServiceImpl implements CreateService {
  @Autowired
  CreateDao createDao;
  
  public void create(Create create) throws Exception {
	createDao.insert(create);
  }
}







