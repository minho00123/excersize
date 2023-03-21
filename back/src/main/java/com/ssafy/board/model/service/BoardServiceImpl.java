package com.ssafy.board.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.board.exception.AccessDeniedException;
import com.ssafy.board.model.dao.BoardDao;
import com.ssafy.board.model.dto.Board;
import com.ssafy.board.model.dto.User;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardDao boardDao;
	
	
	@Override
	public List<Board> getBoardList(HashMap<String, String> params) {
		return boardDao.selectList(params);
	}

	@Override
	public Board getBoardByNum(int num) {
		return boardDao.selectOne(num);
	}

	@Override
	public void writeBoard(Board board) {
		boardDao.insertBoard(board);
	}

	@Override
	public boolean modifyBoard(Board board, User user) throws Exception {
		Board originBoard = boardDao.selectOne(board.getNum());
		originBoard.setTitle(board.getTitle());
		originBoard.setContent(board.getContent());
		return boardDao.updateBoard(originBoard) == true;
	}

	@Override
	public boolean deleteBoard(int num) {
		return boardDao.deleteBoard(num) == true;
	}

	@Override
	public void updateCnt(int num) {
		Board board = boardDao.selectOne(num);
		board.setViewCnt(board.getViewCnt()+1);
		boardDao.updateBoard(board);
	}

	@Override
	public Board readBoard(int num) {
		this.updateCnt(num);
		return boardDao.selectOne(num);
	}
	
	
	
}