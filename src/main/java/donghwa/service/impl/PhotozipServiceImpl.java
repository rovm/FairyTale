package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BoardDao;
import donghwa.dao.PhotozipDao;
import donghwa.domain.Photozip;
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
}







