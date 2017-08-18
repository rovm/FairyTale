package donghwa.service;

import java.util.List;

import donghwa.domain.Together;


public interface TogetherService {
  List<Together> list(int pageNo, int pageSize, int mno) throws Exception;
  int getSize(int mno) throws Exception;
  List<Together> get(int ctno) throws Exception;
  List<Together> getMno(int mno) throws Exception;
  void addLike(Together together) throws Exception;
  void delLike(Together together) throws Exception;
}







