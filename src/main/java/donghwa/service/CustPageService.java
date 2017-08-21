package donghwa.service;

import java.util.List;

import donghwa.domain.CustPage;


public interface CustPageService {
  List<CustPage> list(int pageNo, int pageSize, int mno) throws Exception;
  int getSize(int mno) throws Exception;
  List<CustPage> get(int ctno) throws Exception;
  void add(CustPage custPage) throws Exception;
  void update(CustPage custPage) throws Exception;
  String custpage_detail(int ctno, int bkno) throws Exception;
  
}







