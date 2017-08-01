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
@RequestMapping("/control/bookList/") 
public class ManagerAddBooklist {
  
  @Autowired ServletContext ctx;
  
  @RequestMapping(path="upload")
  public Object upload1(String name,  MultipartFile[] files) throws Exception {
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("name", name);
    
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
