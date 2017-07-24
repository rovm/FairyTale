package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.UserDao;
import donghwa.domain.User;
import donghwa.service.UserService;


@Service
public class UserServiceImpl implements UserService {
  @Autowired
  UserDao userDao;
  
  public void join(User user) throws Exception {
	userDao.insert(user);
  }
}







