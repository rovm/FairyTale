/* Spring WebMVC: JSON 콘텐츠로 응답하기 + 파일 업로드
 * => AJAX 파일 업로드
 */
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
@RequestMapping("/control/photozip/") 
public class PhotozipControl {
  
  @Autowired ServletContext ctx;
  
  @RequestMapping(path="add")
  public Object upload1(String titl, String description,  MultipartFile[] files) throws Exception {
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("titl", titl);
    resultMap.put("description", description);
    resultMap.put("path", ctx.getRealPath("/upload/" + files[0].getOriginalFilename()));
    System.out.printf("titl: %s  description: %s\n",titl, description);
    
    ArrayList<Object> fileList = new ArrayList<>();
    
    for (int i = 0; i < files.length; i++) {
      
      files[i].transferTo(new File(ctx.getRealPath("/upload/" + files[i].getOriginalFilename())));
      HashMap<String,Object> fileMap = new HashMap<>();
      fileMap.put("filename", files[i].getOriginalFilename());
      fileMap.put("filesize", files[i].getSize());
      fileList.add(fileMap);
      System.out.println(ctx.getRealPath("/upload/" + files[i].getOriginalFilename()));
    }
    resultMap.put("fileList", fileList);
    System.out.println(resultMap);
    return resultMap;
  }
}
