package donghwa.control.json;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import donghwa.service.FaqService;

@RestController
@RequestMapping("/p-desktop/")
public class FaqControl {
  
  @Autowired ServletContext servletContext;
  @Autowired FaqService faqService;
  
  @RequestMapping("FAQ_list")
  public JsonResult list(
      @RequestParam String selectBtn,
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", faqService.list(pageNo, pageSize, selectBtn));
    dataMap.put("totalCount", faqService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  
/*  @RequestMapping("selectList")
  public JsonResult selectList(
      @RequestParam Map<String, String> selectBtn) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("selectList", faqService.selectList(selectBtn));
    dataMap.put("totalCount", faqService.selectGetSize(selectBtn));
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }*/
  
  
  
}









