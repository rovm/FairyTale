package donghwa.control.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import donghwa.domain.MSTBook;
import donghwa.service.MSTBookService;

@RestController
@RequestMapping("/p-desktop/")
public class MSTBookControl {
  
  @Autowired ServletContext servletContext;
  @Autowired MSTBookService mstBookService;
  
  @RequestMapping("MSTBOOK_list")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="12") int pageSize,@RequestParam String selectform) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", mstBookService.list(pageNo, pageSize,selectform));
    dataMap.put("totalCount", mstBookService.getSize(selectform));
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("MSTBOOK_detail")
  public JsonResult detail(@RequestParam int no) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
//    List<MSTBook> mstbook = mstBookService.get(no);
    dataMap.put("list", mstBookService.get(no));
    if (dataMap == null) {
      return new JsonResult(JsonResult.FAIL, no + "번 책이 없습니다.");
    }
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
}









