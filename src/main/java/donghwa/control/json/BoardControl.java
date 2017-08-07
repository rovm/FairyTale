package donghwa.control.json;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
  
  @RequestMapping("comAdd")
  public JsonResult comAdd(Board board) throws Exception {
    boardService.comAdd(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("conAdd")
  public JsonResult conAdd(Board board) throws Exception {
    boardService.conAdd(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("list")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", boardService.list(pageNo, pageSize));
    dataMap.put("totalCount", boardService.getSize());
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  @RequestMapping("suchList")
  public JsonResult suchList(
      @RequestParam Map<String, String> keyword) throws Exception {
    
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("suchList", boardService.suchList(keyword));
    dataMap.put("totalCount", boardService.suchGetSize(keyword));
    
    
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
//  /*************************************************/
  @RequestMapping("comList")
  public JsonResult comList(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize,
      @RequestParam(defaultValue="1") int bwnoNo) throws Exception {

    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("comList", boardService.comList(pageNo, pageSize,bwnoNo));
    dataMap.put("totalCount", boardService.comGetSize(bwnoNo));

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
  
  @RequestMapping("comDelete")
  public JsonResult comDelete(int no) throws Exception {
    boardService.comRemove(no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("update")
  public JsonResult update(Board board) throws Exception {
    boardService.update(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }
  
  @RequestMapping("conUpdate")
  public JsonResult conUpdate(Board board) throws Exception {
    boardService.conUpdate(board);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }



@RequestMapping(path="upload1")
public JsonResult upload1(Board board, MultipartFile[] files) throws Exception {
	  System.out.println(files.length);
	  System.out.println(board);
    files[0].transferTo(new File(servletContext.getRealPath("/upload/" + files[0].getOriginalFilename())));
    
    board.setFilePath("/upload/" + files[0].getOriginalFilename());
    board.setFileName(files[0].getOriginalFilename());
   
    boardService.add(board);
    
  System.out.println(board);
  return new JsonResult(JsonResult.SUCCESS, "ok");
}

@RequestMapping(path="upload2")
public JsonResult upload2(Board board, MultipartFile[] files) throws Exception {
	  System.out.println(files.length);
	  System.out.println(board);
    files[0].transferTo(new File(servletContext.getRealPath("/upload/" + files[0].getOriginalFilename())));
    
    board.setFilePath("/upload/" + files[0].getOriginalFilename());
    board.setFileName(files[0].getOriginalFilename());
   
    boardService.update(board);
  System.out.println(board);
  return new JsonResult(JsonResult.SUCCESS, "ok");
}
}






