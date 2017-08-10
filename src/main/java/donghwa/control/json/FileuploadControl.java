package donghwa.control.json;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import donghwa.domain.Board;
import donghwa.domain.Fileupload;
import donghwa.service.FileuploadService;

@RestController
@RequestMapping("/p-desktop/")
public class FileuploadControl {
  
  @Autowired ServletContext servletContext;
  @Autowired FileuploadService fileuploadService;
  


@RequestMapping(path="upload1")
public JsonResult upload1(Fileupload fileupload, MultipartFile[] files) throws Exception {
	  System.out.println(files.length);
    files[0].transferTo(new File(servletContext.getRealPath("/upload/" + files[0].getOriginalFilename())));
    
    fileupload.setFilePath("/upload/" + files[0].getOriginalFilename());
    fileupload.setFileName(files[0].getOriginalFilename());
   
    fileuploadService.add(fileupload);
    
  System.out.println(fileupload);
  return new JsonResult(JsonResult.SUCCESS, "ok");
}



@RequestMapping(path="upload2")
public JsonResult upload2(Fileupload fileupload, MultipartFile[] files) throws Exception {
	  System.out.println(files.length);
	  System.out.println(fileupload);
    files[0].transferTo(new File(servletContext.getRealPath("/upload/" + files[0].getOriginalFilename())));
    
    fileupload.setFilePath("/upload/" + files[0].getOriginalFilename());
    fileupload.setFileName(files[0].getOriginalFilename());
   
    fileuploadService.update(fileupload);
  System.out.println(fileupload);
  return new JsonResult(JsonResult.SUCCESS, "ok");
}

@RequestMapping("detail")
public JsonResult detail(int no) throws Exception {
  Fileupload fileupload = fileuploadService.get(no);
  if (fileupload == null) {
    return new JsonResult(JsonResult.FAIL, no + "번 게시글이 없습니다.");
  }
  return new JsonResult(JsonResult.SUCCESS, fileupload);
}

}






