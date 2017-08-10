package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.FileuploadDao;
import donghwa.domain.Fileupload;
import donghwa.service.FileuploadService;


@Service
public class FileuploadServiceImpl implements FileuploadService {
  @Autowired
  FileuploadDao fileuploadDao;
  
  public void add(Fileupload fileupload) throws Exception {
	  fileuploadDao.insert(fileupload);
	  fileuploadDao.insert2(fileupload);
  }
  
  public Fileupload get(int no) throws Exception {
		return fileuploadDao.selectOne(no);
	  }
  
  public void update(Fileupload fileupload) throws Exception {
	    int count = fileuploadDao.update(fileupload);
	    if (count < 1) {
	      throw new Exception(fileupload.getNo() + "번 강사를 찾을 수 없습니다.");
	    }
	    
	  }
  




}







