package donghwa.control.json;

import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Comment;
import donghwa.service.CommentService;

@RestController
@RequestMapping("/p-desktop/")
public class CommentControl {
  
  @Autowired ServletContext servletContext;
  @Autowired CommentService commentService;
  
  
  @RequestMapping("comAdd")
  public JsonResult comAdd(Comment comment) throws Exception {
	commentService.comAdd(comment);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
//  /*************************************************/
  @RequestMapping("comList")
  public JsonResult comList(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize,
      @RequestParam(defaultValue="1") int bwnoNo) throws Exception {

    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("comList", commentService.comList(pageNo, pageSize,bwnoNo));
    dataMap.put("totalCount", commentService.comGetSize(bwnoNo));

    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  
  @RequestMapping("comDelete")
  public JsonResult comDelete(int no) throws Exception {
	commentService.comRemove(no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
}






