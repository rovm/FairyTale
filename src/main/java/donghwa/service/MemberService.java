package donghwa.service;

import donghwa.domain.Member;

public interface MemberService {
  void add2(Member member) throws Exception;
  Member getByEmailPassword(String email, String password) throws Exception;
}
