package donghwa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import donghwa.dao.BoardDao;
import donghwa.domain.Board;
import donghwa.service.BoardService;


@Service
public class BoardServiceImpl implements BoardService {
  @Autowired
  BoardDao boardDao;
  
  public void add(Board board) throws Exception {
    boardDao.insert(board);
  }
}







