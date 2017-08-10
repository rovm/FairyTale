package donghwa.dao;

import donghwa.domain.Fileupload;

public interface FileuploadDao {
  int insert(Fileupload fileupload);
  int insert2(Fileupload fileupload);
  int update(Fileupload fileupload);
  int update2(Fileupload fileupload);
  Fileupload selectOne(int no);
}
