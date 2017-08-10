package donghwa.service;

import java.util.List;

import donghwa.domain.Photozip;

public interface PhotozipService {
  void add(Photozip Photozip) throws Exception;
  List<Photozip> list(int pageNo, int pageSize, int mno) throws Exception;
  int getSize(int mno) throws Exception;
  void remove(int no) throws Exception;
}






