package donghwa.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BoardDao;
import donghwa.dao.PhotozipDao;
import donghwa.domain.Photozip;
import donghwa.domain.Teacher;
import donghwa.service.PhotozipService;

@Service
public class PhotozipServiceImpl implements PhotozipService {
  @Autowired
  BoardDao boardDao;
  
  @Autowired
  PhotozipDao photozipDao;
  
  
  public void add(Photozip photozip) throws Exception {
    photozipDao.insert2(photozip);
    photozipDao.insert(photozip);
  }
  
  public List<Photozip> list(int pageNo, int pageSize, int mno) throws Exception {
    HashMap<String,Object> valueMap = new HashMap<>();
    valueMap.put("startIndex", (pageNo - 1) * pageSize);
    valueMap.put("pageSize", pageSize);
    valueMap.put("mno", mno);
    
    return photozipDao.selectList(valueMap);
  }
  
  public int getSize(int mno) throws Exception {
    return photozipDao.countAll(mno);
  }
  
  public void remove(int no) throws Exception {
  int count = photozipDao.delete(no);
  if (count < 1) {
    throw new Exception(no + "번 게시글을 찾을 수 없습니다.");
  }
  
  try {
    count = photozipDao.delete2(no);
  } catch (Exception e) {}
}
}







