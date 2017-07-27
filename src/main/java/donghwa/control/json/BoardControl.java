package donghwa.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import donghwa.domain.Board;
import donghwa.service.BoardService;

@RestController
@RequestMapping("/p-desktop/")
public class BoardControl {
  
  @Autowired ServletContext servletContext;
  @Autowired BoardService boardService;
  
  
  
  @RequestMapping("add")
  public JsonResult add(Board board) throws Exception {
    boardService.add(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
}









