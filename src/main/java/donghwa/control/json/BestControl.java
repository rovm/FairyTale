/* Spring WebMVC: JSON 콘텐츠로 응답하기 + 파일 업로드
 * => AJAX 파일 업로드
 */
package donghwa.control.json;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import donghwa.service.BestService;

@RestController
@RequestMapping("/p-desktop/") 
public class BestControl {
  
  @Autowired ServletContext servletContext;
  @Autowired BestService bestService;
  
  @RequestMapping("BestList")
  public JsonResult list() throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("BestLastList", bestService.list());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
}