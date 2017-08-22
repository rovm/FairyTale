package donghwa.control.json;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import donghwa.service.NoticeService;

@RestController
@RequestMapping("/p-desktop/")
public class NoticeControl {
  
  @Autowired ServletContext servletContext;
  @Autowired NoticeService noticeService;
  
  
  @RequestMapping("noticeList")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("noticeList", noticeService.noticeList(pageNo, pageSize));
    dataMap.put("totalCount", noticeService.noticeGetSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  @RequestMapping("noticeSuchList")
  public JsonResult suchList(
      @RequestParam Map<String, String> keyword) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("noticeSuchList", noticeService.noticeSuchList(keyword));
    dataMap.put("totalCount", noticeService.noticeSuchGetSize(keyword));
    
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  
}






