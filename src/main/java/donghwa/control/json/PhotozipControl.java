/* Spring WebMVC: JSON 콘텐츠로 응답하기 + 파일 업로드
 * => AJAX 파일 업로드
 */
package donghwa.control.json;

import java.io.File;
import java.util.HashMap;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import donghwa.domain.Photozip;
import donghwa.service.PhotozipService;
import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/p-desktop/") 
public class PhotozipControl {

  @Autowired PhotozipService photozipService;
  @Autowired ServletContext ctx;
  AuthControl authControl;
 
  @RequestMapping(path="upload")
  public JsonResult upload1(Photozip photozip, MultipartFile[] files) throws Exception {
//      files[0].transferTo(new File(ctx.getRealPath("/upload/" + files[0].getOriginalFilename())));
//      System.out.println(new File(ctx.getRealPath("/upload/" + files[0].getOriginalFilename())));
      
      String newFilename = this.getNewFilename();
      File file = new File(ctx.getRealPath("/upload/" + newFilename));
      files[0].transferTo(file);
      System.out.println(file);
      
      File thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_230"));
      Thumbnails.of(file).size(230, 180).outputFormat("png").toFile(thumbnail); 
      
      thumbnail = new File(ctx.getRealPath("/upload/" + newFilename + "_960"));
      Thumbnails.of(file).size(960, 600).outputFormat("png").toFile(thumbnail);
      
      photozip.setFilePath("/upload/" + newFilename +"_960.png");
      photozip.setFileName("/upload/" + newFilename +"_230.png");
    photozipService.add(photozip);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }

  @RequestMapping("photozip_list")
  public JsonResult list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="5") int pageSize,@RequestParam int mno) throws Exception {
    HashMap<String,Object> dataMap = new HashMap<>();
    dataMap.put("list", photozipService.list(pageNo, pageSize, mno));
    dataMap.put("totalCount", photozipService.getSize(mno));
    return new JsonResult(JsonResult.SUCCESS, dataMap);
  }
  
  @RequestMapping("photozip_delete")
  public JsonResult delete(int no) throws Exception {
    photozipService.remove(no);
    return new JsonResult(JsonResult.SUCCESS, "ok");
  }  
  
  int count = 0;
  synchronized private String getNewFilename() {
    if (count > 100) {
      count = 0;
    }
    return String.format("%d_%d", System.currentTimeMillis(), ++count); 
  }
}