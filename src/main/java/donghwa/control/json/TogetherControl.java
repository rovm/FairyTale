/* Spring WebMVC: JSON 콘텐츠로 응답하기 + 파일 업로드
 * => AJAX 파일 업로드
 */
package donghwa.control.json;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Together;
import donghwa.service.TogetherService;

@RestController
@RequestMapping("/p-desktop/") 
public class TogetherControl {
  
  @Autowired ServletContext servletContext;
  @Autowired TogetherService togetherService;
  
  @RequestMapping("TogetherList")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="12") int pageSize,@RequestParam int mno) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("TogetherList", togetherService.list(pageNo, pageSize, mno));
    dataMap.put("totalCount", togetherService.getSize(mno));
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("TogetherDetail")
  public JsonResult detail(@RequestParam(defaultValue="1") int ctno) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("TogetherDetail", togetherService.get(ctno));
  
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("addLike")
  public JsonResult addLike(Together together) throws Exception {
    togetherService.addLike(together);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("delLike")
  public JsonResult delLike(Together together) throws Exception {
    togetherService.delLike(together);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("heartfull")
  public JsonResult heartfull(@RequestParam int mno) throws Exception {
	  HashMap<String,Object> dataMap = new HashMap<>();
	    dataMap.put("heartfull", togetherService.getMno(mno));
	    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
}