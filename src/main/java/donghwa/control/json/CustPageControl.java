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

import donghwa.service.CustPageService;

@RestController
@RequestMapping("/p-desktop/") 
public class CustPageControl {
  
  @Autowired ServletContext servletContext;
  @Autowired CustPageService custPageService;
  
  @RequestMapping("CustPage_list")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="12") int pageSize,@RequestParam int mno) throws Exception {
    System.out.println(pageNo + pageSize + mno);
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", custPageService.list(pageNo, pageSize, mno));
    dataMap.put("totalCount", custPageService.getSize(mno));
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("storage-detail")
  public JsonResult detail(int ctno) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", custPageService.get(ctno));
  
    return new JsonResult(JsonResult.SUCCESS, dataMap);
}
}