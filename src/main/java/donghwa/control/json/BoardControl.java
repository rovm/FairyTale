package donghwa.control.json;

<<<<<<< HEAD
=======
import java.util.HashMap;

>>>>>>> origin/master
import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Board;
=======
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Board;
import donghwa.domain.Teacher;
>>>>>>> origin/master
import donghwa.service.BoardService;

@RestController
@RequestMapping("/p-desktop/")
public class BoardControl {
  
  @Autowired ServletContext servletContext;
  @Autowired BoardService boardService;
  
<<<<<<< HEAD
  
  
=======
>>>>>>> origin/master
  @RequestMapping("add")
  public JsonResult add(Board board) throws Exception {
    boardService.add(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
<<<<<<< HEAD
=======
  
  @RequestMapping("list")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", boardService.list(pageNo, pageSize));
    dataMap.put("totalCount", boardService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  @RequestMapping("detail")
  public JsonResult detail(int no) throws Exception {
    Board board = boardService.get(no);
    if (board == null) {
      return new JsonResult(JsonResult.FAIL, no + "번 게시글이 없습니다.");
    }
    return new JsonResult(JsonResult.SUCCESS, board);
  }
  @RequestMapping("delete")
  public JsonResult delete(int no) throws Exception {
    boardService.remove(no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  } 
  
  @RequestMapping("update")
  public JsonResult update(Board board) throws Exception {
    boardService.update(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
>>>>>>> origin/master
}









