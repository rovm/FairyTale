package donghwa.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.MemberDao;
import donghwa.domain.Member;
import donghwa.service.MemberService;


@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  MemberDao memberDao;
  
  
  public Member getByEmailPassword(String email, String password) throws Exception {
	    HashMap<String,Object> valueMap = new HashMap<>();
	    valueMap.put("email", email);
    valueMap.put("password", password);
    
    return memberDao.selectOneByEmailPassword(valueMap);
  }
  
  
  
  public void add2(Member member) throws Exception {
    memberDao.insert(member);
  }
}







