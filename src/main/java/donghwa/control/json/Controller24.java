package donghwa.control.json;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/control/controller24/") 
public class Controller24 {
  
  @Autowired ServletContext ctx;
  
  @RequestMapping(path="upload1")
  public Object upload1(String name, int age, MultipartFile[] files) throws Exception {
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("name", name);
    resultMap.put("age", age);
    
    ArrayList<Object> fileList = new ArrayList<>();
    
    for (int i = 0; i < files.length; i++) {
      files[i].transferTo(new File(ctx.getRealPath("/upload/" + files[i].getOriginalFilename())));
      System.out.println("/upload/" + files[i].getOriginalFilename());
      HashMap<String,Object> fileMap = new HashMap<>();
      fileMap.put("filename", files[i].getOriginalFilename());
      fileMap.put("filesize", files[i].getSize());
      fileList.add(fileMap);
    }
    resultMap.put("fileList", fileList);
    return resultMap;
  }

}