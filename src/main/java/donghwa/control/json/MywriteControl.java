package donghwa.control.json;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import donghwa.service.MywriteService;

@RestController
@RequestMapping("/p-desktop/")
public class MywriteControl {
  
  @Autowired ServletContext servletContext;
  @Autowired MywriteService mywriteService;
  
  
  @RequestMapping("myList")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize,
      @RequestParam int memberNo
      ) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("myList", mywriteService.myList(pageNo, pageSize, memberNo));
    dataMap.put("totalCount", mywriteService.getSize(memberNo));
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  @RequestMapping("mySuchList")
  public JsonResult suchList(
      @RequestParam Map<String, String> keyword) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("mySuchList", mywriteService.mySuchList(keyword));
    dataMap.put("totalCount", mywriteService.suchGetSize(keyword));
    
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  
/*  
  @RequestMapping("detail")
  public JsonResult detail(int no) throws Exception {
    Board board = boardService.get(no);
    if (board == null) {
      return new JsonResult(JsonResult.FAIL, no + "번 게시글이 없습니다.");
    }
    return new JsonResult(JsonResult.SUCCESS, board);
  }*/
}






