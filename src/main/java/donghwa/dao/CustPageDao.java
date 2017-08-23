package donghwa.dao;

import java.util.List;
import java.util.Map;

import donghwa.domain.CustPage;

public interface CustPageDao {
  int countAll(int mno);
  List<CustPage> selectList(Map<String,Object> valueMap);
  List<CustPage> selectOne(int ctno);
  void insert(CustPage custPage);
  void update(CustPage custPage);
  CustPage list0(int ctno);
  String custpage_detail(Map<String,Object> valueMap);
  int delete(int no);
  int delete2(int no);
}
