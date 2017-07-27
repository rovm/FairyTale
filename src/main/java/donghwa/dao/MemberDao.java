package donghwa.dao;

import java.util.Map;

import donghwa.domain.Member;

public interface MemberDao {
  int insert(Member member);
  Member selectOneByEmailPassword(Map<String,Object> valueMap);
}
