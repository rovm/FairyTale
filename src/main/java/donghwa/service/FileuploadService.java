package donghwa.service;

import donghwa.domain.Fileupload;

public interface FileuploadService {
  void add(Fileupload fileupload) throws Exception;
  void update(Fileupload fileupload) throws Exception;
  Fileupload get(int no) throws Exception;
}







