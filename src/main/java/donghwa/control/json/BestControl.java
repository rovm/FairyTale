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

import donghwa.service.BestService;

@RestController
@RequestMapping("/p-desktop/") 
public class BestControl {
  
  @Autowired ServletContext servletContext;
  @Autowired BestService bestService;
  
  @RequestMapping("BestList")
  /*이 맵은 핸들바스에서 쓰는 맵, {{each BestLastList}} 이 부분 혹은 데이터 가져올때  result.data.BestLastList*/
  public JsonResult list(@RequestParam int year,
		                 @RequestParam int month) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("BestLastList", bestService.list(year, month));
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
}